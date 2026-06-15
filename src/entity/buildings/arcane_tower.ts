import { BUILDING_PROPERTIES } from "../../utils/constants";
import { Player } from "../player";
import { Build } from "./build";

export class ArcaneTower extends Build {
  private distanceOffRegenMana: number;
  private distance: number;
  private rangeCircle: Phaser.GameObjects.Graphics;
  private target: Player;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    target: Player,
  ) {
    super(scene, x, y, texture);

    this.distanceOffRegenMana =
      BUILDING_PROPERTIES.ARCANE_TOWER.distanceOffMana;

    this.target = target;
    this.rangeCircle = scene.add.graphics();
    this.rangeCircle.lineStyle(2, 0x00bfff, 0.8);
    this.rangeCircle.strokeCircle(0, 0, this.distanceOffRegenMana);
    this.rangeCircle.setAlpha(0.3);
    this.rangeCircle.setPosition(x, y);

    this.setScale(1.5);

    this.play("arcane_tower");
  }

  checkDistance(): void {
    this.distance = Phaser.Math.Distance.BetweenPoints(this, this.target);
  }

  update(): void {
    this.checkDistance();
    if (this.distance <= this.distanceOffRegenMana) {
      this.target.restoreMana(-10);
    }
  }
}
