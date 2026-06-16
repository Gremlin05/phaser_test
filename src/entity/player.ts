import { Entity } from "./entity";
import { MAGIC_PROPERTIES, SPRITES } from "../utils/constants";
import { PLAYER_PROPERTIES } from "../utils/constants";
import { Magic } from "./magic";
import { Inventory } from "../scenes/inventory/inventory";
import type { Interactable } from "./interactable/interactable";
import type { CraftUI } from "../scenes/inventory/craftingUI";

export class Player extends Entity {
  textureKey: string;
  private movespeed: number;

  private hp: number;
  private maxHp: number;
  private mana: number;
  private maxMana: number;
  public exp: number;
  public inventory: Inventory;

  private hpRegenRate: number;
  private manaRegenRate: number;

  private lastDamageTime: number = 0;

  private keys: Phaser.Types.Input.Keyboard.CursorKeys;
  private interactKey: Phaser.Input.Keyboard.Key;
  private craftKey: Phaser.Input.Keyboard.Key;
  private skillKeys;

  private magicGroup: Phaser.Physics.Arcade.Group;

  public currentTarget: any = null;
  public interactTarget: Interactable;
  public canCraft: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    magicGroup: Phaser.Physics.Arcade.Group,
  ) {
    super(scene, x, y, texture, SPRITES.PLAYER);

    this.hp = PLAYER_PROPERTIES.HP;
    this.mana = PLAYER_PROPERTIES.MANA;

    this.exp = 0;

    this.maxHp = PLAYER_PROPERTIES.HP;
    this.maxMana = PLAYER_PROPERTIES.MANA;

    this.hpRegenRate = PLAYER_PROPERTIES.HP_REGEN_RATE;
    this.manaRegenRate = PLAYER_PROPERTIES.MANA_REGEN_RATE;

    this.movespeed = 100;

    this.magicGroup = magicGroup;

    this.setSize(24, 24);
    this.setOffset(4, 6);

    this.setDepth(2);

    this.startManaRegen();
    this.startHpRegen();

    this.keys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as Phaser.Types.Input.Keyboard.CursorKeys;
    this.skillKeys = scene.input.keyboard.addKeys("ONE, TWO, THREE");
    this.interactKey = scene.input.keyboard.addKey("E");
    this.craftKey = scene.input.keyboard.addKey("F");

    this.inventory = new Inventory(20);
  }

  moveMent(): void {
    if (this.keys.up.isDown) {
      this.play("up", true);
      this.setVelocityY(-this.movespeed);
      this.setVelocityX(0);
    } else if (this.keys.down.isDown) {
      this.play("down", true);
      this.setVelocityY(this.movespeed);
      this.setVelocityX(0);
    } else if (this.keys.left.isDown) {
      this.play("left", true);
      this.setVelocityX(-this.movespeed);
      this.setVelocityY(0);
    } else if (this.keys.right.isDown) {
      this.play("right", true);
      this.setVelocityX(this.movespeed);
      this.setVelocityY(0);
    } else {
      this.setVelocity(0, 0);
      this.play("idle", true);
    }
  }

  castSkills(): Magic {
    if (
      Phaser.Input.Keyboard.JustDown(this.skillKeys.ONE) &&
      this.mana >= MAGIC_PROPERTIES.AURA.cost
    ) {
      this.spendMana(MAGIC_PROPERTIES.AURA.cost);
      const skill = new Magic(
        this.scene,
        this.x,
        this.y,
        SPRITES.MAGIC,
        "Aura",
        0,
        this,
      );

      this.magicGroup.add(skill);
      return skill;
    } else if (
      Phaser.Input.Keyboard.JustDown(this.skillKeys.TWO) &&
      this.mana >= MAGIC_PROPERTIES.AOE.cost
    ) {
      this.spendMana(MAGIC_PROPERTIES.AOE.cost);
      const pointer = this.scene.input.activePointer;
      const worldPoint = pointer.positionToCamera(
        this.scene.cameras.main,
      ) as Phaser.Math.Vector2;

      const skill = new Magic(
        this.scene,
        worldPoint.x,
        worldPoint.y,
        SPRITES.MAGIC,
        "AOE",
        1,
      );

      this.magicGroup.add(skill);
      return skill;
    } else if (
      Phaser.Input.Keyboard.JustDown(this.skillKeys.THREE) &&
      this.mana >= MAGIC_PROPERTIES.BOLT.cost
    ) {
      this.spendMana(MAGIC_PROPERTIES.BOLT.cost);
      const pointer = this.scene.input.activePointer;
      const worldPoint = pointer.positionToCamera(
        this.scene.cameras.main,
      ) as Phaser.Math.Vector2;

      const skill = new Magic(
        this.scene,
        this.x,
        this.y,
        SPRITES.MAGIC,
        "Bolt",
        2,
        null,
        worldPoint.x,
        worldPoint.y,
      );

      this.magicGroup.add(skill);
      return skill;
    }
  }

  spendMana(cost): void {
    this.mana -= cost;
    this.scene.events.emit("player:manaChanged", this.mana);
  }

  startManaRegen(): void {
    this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.restoreMana(this.manaRegenRate);
      },
    });
  }

  restoreMana(amount: number) {
    const oldMana = this.mana;

    this.mana = Phaser.Math.Clamp(this.mana + amount, 0, this.maxMana);

    if (this.mana !== oldMana) {
      this.scene.events.emit("player:manaChanged", this.mana, this.maxMana);
    }
  }

  startHpRegen(): void {
    this.scene.time.addEvent({
      delay: 1000,
      loop: true,

      callback: () => {
        if (this.scene.time.now - this.lastDamageTime < 3000) return;
        this.restoreHp(this.hpRegenRate);
      },
    });
  }

  restoreHp(amount: number): void {
    const oldHp = this.hp;

    this.hp = Phaser.Math.Clamp(this.hp + amount, 0, this.maxHp);

    if (this.hp !== oldHp) {
      this.scene.events.emit("player:hpChanged", this.hp, this.maxHp);
    }
  }

  takeDamage(count: number): void {
    this.hp -= count;
    this.lastDamageTime = this.scene.time.now;

    this.scene.events.emit("player:hpChanged", this.hp, this.maxHp);

    if (this.hp <= 0) {
      this.die();
    }
  }

  getExp(): void {
    if (this.exp == PLAYER_PROPERTIES.MAX_EXP) {
      return;
    }

    this.exp++;
  }
  die(): void {
    this.scene.scene.start("Menu");
    this.scene.scene.stop("UI");
    this.destroy();
  }

  handleInteract(): void {
    if (!Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      return;
    }

    const nearby = this.interactTarget;
    if (nearby && nearby.distance <= nearby.distanceForInteract) {
      nearby.giveLoot();
      console.log(this.inventory.getItems());
    }
  }
  
  handleCraftOpen(): void {
  if (!Phaser.Input.Keyboard.JustDown(this.craftKey)) return;
  if (!this.canCraft) return;

  const ui = this.scene.scene.get("CRAFT_UI") as CraftUI;
  ui.toggle();
}

  update(): void {
    this.handleInteract();
    this.handleCraftOpen();
    this.moveMent();
    this.castSkills();
  }
}
