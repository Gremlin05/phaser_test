import { BUILDING_PROPERTIES } from "../../utils/constants";
import { Player } from "../player";
import { Build } from "./build";

export class FireTower extends Build {
  private distanceDealContinuousDamage: number;
  private distance: number;
  private rangeCircle: Phaser.GameObjects.Graphics;
  private target: Player;
  private attackDelay: number;
  private attackCooldown: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    target: Player,
  ) {
    super(scene, x, y, texture);

    this.distanceDealContinuousDamage = BUILDING_PROPERTIES.FIRE_TOWER.distanceDealContinuousDamage

    this.target = target;
    this.rangeCircle = scene.add.graphics();
    this.rangeCircle.lineStyle(2, 0xFF8C00, 0.8);
    this.rangeCircle.strokeCircle(0, 0, this.distanceDealContinuousDamage);
    this.rangeCircle.setAlpha(0.3)
    this.rangeCircle.setPosition(x, y)

    this.attackDelay = BUILDING_PROPERTIES.FIRE_TOWER.attackDelay
    this.attackCooldown = false

    this.setScale(1.5)

    this.play("fire_tower");
  }

  checkDistance(): void {
    this.distance = Phaser.Math.Distance.BetweenPoints(this, this.target);
  }

  update(): void {

    this.checkDistance()
    if (this.distance <= this.distanceDealContinuousDamage) {
      if(this.attackCooldown) return

      this.attackCooldown = true;
      this.scene.time.delayedCall(this.attackDelay, ()=>{
        this.target.restoreHp(-10)
        this.attackCooldown = false
      })
    }
  }
}
