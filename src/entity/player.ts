import { Entity } from "./entity";
import { MAGIC_PROPERTIES, SPRITES } from "../utils/constants";
import { PLAYER_PROPERTIES } from "../utils/constants";
import { Magic } from "./magic";

export class Player extends Entity {
  textureKey: string;
  private movespeed: number;

  private hp: number;
  private maxHp: number;
  private mana: number;
  private maxMana: number;

  private hpRegenRate: number;
  private manaRegenRate: number;

  private hpRegenEvent: Phaser.Time.TimerEvent;
  private manaRegenEvent: Phaser.Time.TimerEvent;

  private keys: Phaser.Types.Input.Keyboard.CursorKeys;
  private skillKeys;
  private skill: Magic;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture, SPRITES.PLAYER);

    this.hp = PLAYER_PROPERTIES.HP;
    this.mana = PLAYER_PROPERTIES.MANA;

    this.maxHp = PLAYER_PROPERTIES.HP;
    this.maxMana = PLAYER_PROPERTIES.MANA;

    this.hpRegenRate = PLAYER_PROPERTIES.HP_REGEN_RATE;
    this.manaRegenRate = PLAYER_PROPERTIES.MANA_REGEN_RATE;

    const anims = this.scene.anims;
    const animsFrameRate = 3;
    this.textureKey = texture;
    this.movespeed = 100;

    this.setSize(24, 24);
    this.setOffset(4, 6);

    this.startManaRegen()

    this.keys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as Phaser.Types.Input.Keyboard.CursorKeys;
    this.skillKeys = scene.input.keyboard.addKeys("ONE, TWO, THREE");

    anims.create({
      key: "idle",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 0,
        end: 1,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    anims.create({
      key: "down",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 2,
        end: 3,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    anims.create({
      key: "right",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 4,
        end: 5,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    anims.create({
      key: "left",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 6,
        end: 7,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });

    anims.create({
      key: "up",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 8,
        end: 9,
      }),
      frameRate: animsFrameRate,
      repeat: -1,
    });
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
      this.spendMana(MAGIC_PROPERTIES.AURA.cost)
      return (this.skill = new Magic(
        this.scene,
        this.x,
        this.y,
        SPRITES.MAGIC,
        "Aura",
        0,
        this,
      ));
    } else if (
      Phaser.Input.Keyboard.JustDown(this.skillKeys.TWO) &&
      this.mana >= MAGIC_PROPERTIES.AOE.cost
    ) {
      this.spendMana(MAGIC_PROPERTIES.AOE.cost)
      return (this.skill = new Magic(
        this.scene,
        this.x,
        this.y,
        SPRITES.MAGIC,
        "AOE",
        1,
      ));
    } else if (
      Phaser.Input.Keyboard.JustDown(this.skillKeys.THREE) &&
      this.mana >= MAGIC_PROPERTIES.BOLT.cost
    ) {
      this.spendMana(MAGIC_PROPERTIES.BOLT.cost)
      const pointer = this.scene.input.activePointer;
      const worldPoint = pointer.positionToCamera(
        this.scene.cameras.main,
      ) as Phaser.Math.Vector2;

      return (this.skill = new Magic(
        this.scene,
        this.x,
        this.y,
        SPRITES.MAGIC,
        "Bolt",
        2,
        null,
        worldPoint.x,
        worldPoint.y,
      ));
    }
  }

  spendMana(cost) : void{
    this.mana -= cost

    this.scene.events.emit("player:manaChanged",this.mana)
  }

  startManaRegen() : void {
    this.manaRegenEvent = this.scene.time.addEvent({
        delay: 1000,
        loop: true,
        callback: () =>{
            this.restoreMana(this.manaRegenRate)
        }
    })
  }

  restoreMana(amount: number) {
    const oldMana = this.mana;

    this.mana = Phaser.Math.Clamp(
        this.mana + amount,
        0,
        this.maxMana
    );

    if (this.mana !== oldMana) {
        this.scene.events.emit("player:manaChanged", this.mana, this.maxMana);
    }
}

  update(): void {
    
    this.moveMent();
    this.castSkills();
  }
}
