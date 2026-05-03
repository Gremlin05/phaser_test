import { Entity } from "./entity";

export class ExpSphere extends Entity{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture)
        this.setScale(0.5)
        this.play("exp")
    }
}