import { Build } from "./build";

export class Portal extends Build {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture)
        this.play("portal")
    }
}