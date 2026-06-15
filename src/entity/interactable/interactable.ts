import { INTERACTABLES_PROPRETIES, SPRITES } from "../../utils/constants";
import type { Player } from "../player";

export class Interactable extends Phaser.Physics.Arcade.Sprite {
  private startRange: number;
  private endRange: number;
  private lootType: string;
  private randomFrameRate;
  private hoverEffectSprite: Phaser.GameObjects.Sprite;
  private intercatIcon: Phaser.GameObjects.Sprite;
  public distance: number;
  public distanceForInteract: number;
  private target: Player;
  private resourceName: string;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    name: string,
    type: string,
    target: Player,
  ) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setInteractive();

    this.resourceName = name;

    const body = this.body as Phaser.Physics.Arcade.Body | null;
    if (body) {
      body.setImmovable(true);
      body.moves = false;
      body.setAllowGravity(false);
    }

    this.startRange = 1;
    this.lootType = type;
    this.distanceForInteract = INTERACTABLES_PROPRETIES.DISTANCE_FOR_INTERACT;
    this.target = target;

    switch (type) {
      case "ore": {
        this.endRange = 2;
        this.randomFrameRate = Phaser.Math.Between(0, 2);
        console.log(this.randomFrameRate);
        this.setFrame(this.randomFrameRate);
        break;
      }
      case "flower": {
        this.endRange = 3;
        this.setScale(0.8);
        if (name === "red_flower") {
          this.play("red_flower", true);
        } else if (name === "green_flower") {
          this.play("green_flower", true);
        } else if (name === "violet_flower") {
          this.play("violet_flower", true);
        }
        break;
      }
      case "chest": {
        this.endRange = 1;
        break;
      }
    }
  }

  showHoverEffect(): void {
    if (this.hoverEffectSprite) return;

    this.hoverEffectSprite = this.scene.add.sprite(
      this.x,
      this.y,
      SPRITES.INTERACTABLES.HOVER_EFFECT,
    );
    this.hoverEffectSprite.setScale(1.5);
    this.hoverEffectSprite.play("hover", true);
  }

  hideHoverEffect(): void {
    if (this.hoverEffectSprite) {
      this.hoverEffectSprite.destroy();
      this.hoverEffectSprite = null;
    }
  }

  private checkDistance(): void {
    this.distance = Phaser.Math.Distance.BetweenPoints(this, this.target);
  }

  private showInteractIcon(): void {
    if (this.intercatIcon) return;
    this.intercatIcon = this.scene.add.sprite(
      this.x + 16,
      this.y - 10,
      SPRITES.INTERACTABLES.INTERACT_ICON,
    );
    this.intercatIcon.setScale(0.6);
  }

  private hideIntercatIcon(): void {
    if (this.intercatIcon) {
      this.intercatIcon.destroy();
      this.intercatIcon = null;
    }
  }

  giveLoot(): void {
    const lootMap = {
      gold_ore: {
        id: "gold_ore",
        name: "Gold Ore",
        texture: SPRITES.INTERACTABLES.MATERIALS_ICONS,
        frame: 3
        
      },

      emerald_ore: {
        id: "emerald_ore",
        name: "Emerald Ore",
        texture: SPRITES.INTERACTABLES.MATERIALS_ICONS,
        frame: 5
      },

      amethyst_ore: {
        id: "amethyst_ore",
        name: "Amethyst Ore",
        texture: SPRITES.INTERACTABLES.MATERIALS_ICONS,
        frame: 4
      },

      red_flower: {
        id: "red_flower",
        name: "Red Flower",
        texture: SPRITES.INTERACTABLES.MATERIALS_ICONS,
        frame: 2
      },

      green_flower: {
        id: "green_flower",
        name: "Green Flower",
        texture: SPRITES.INTERACTABLES.MATERIALS_ICONS,
        frame: 1
      },

      violet_flower: {
        id: "violet_flower",
        name: "Violet Flower",
        texture: SPRITES.INTERACTABLES.MATERIALS_ICONS,
        frame: 0
      },
    };

    const loot = lootMap[this.resourceName];

    if (!loot) {
      console.warn(`Unknown loot: ${this.resourceName}`);
      return;
    }

    this.target.inventory.addItem(loot.id, loot.name, 1,99, loot.texture,loot.frame );
    this.scene.events.emit(
      "inventoryChanged",
      this.target.inventory.getItems(),
    );

    this.scene.events.emit(
      "inventoryChanged",
      this.target.inventory.getItems(),
    );

    this.destroy();
    this.hideIntercatIcon();
    this.hideHoverEffect();
  }

  update(): void {
    this.checkDistance();
    if (this.distance <= this.distanceForInteract) {
      this.target.interactTarget = this;
      this.showInteractIcon();
    } else {
      if (this.target.interactTarget === this) {
        this.target.interactTarget = null;
      }

      this.hideIntercatIcon();
    }
  }
}
