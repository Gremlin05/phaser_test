import { Entity } from "../entity";

export class Build extends Entity {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    const body = this.body as Phaser.Physics.Arcade.Body | null;
    if (body) {
      body.setImmovable(true);
      body.moves = false;
      body.setAllowGravity(false);
    }
    this.setDepth(1);
  }
}
