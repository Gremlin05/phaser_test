import { Entity } from "./entity";
import { SPRITES } from "../utils/constants";

export class Arrow extends Entity {
  public hasHit: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture, SPRITES.WEAPONS.ARRROW);

    this.hasHit = false;

    this.setSize(22, 8);
  }
}
