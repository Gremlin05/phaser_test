import { Entity } from "./entity";

export class Magic extends Entity{

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type: string) {
        super(scene, x, y, texture, type)

        if(type == "Bolt" )
        {
            console.log("Выпущена ", type)
        }
        else if (type == "AOE")
        {
            console.log("Удар по области ", type)
        }
        else if (type == "Aura")
        {
            console.log("Помешана ", type)
        }
        else
        {
            console.log("Пустышка")
        }
    }
}