import { Entity } from "./entity"


export class Weapon extends Entity{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number)
    {
        super(scene, x, y, texture)

        this.setFrame(frame)
        this.setSize(10, 30)
    }
}