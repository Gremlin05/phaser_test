import { Build } from "./build";

export class ArcaneGatesColumns extends Build{
    

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, facingRight: boolean)
    {
        super(scene, x, y, texture)
        
        this.setScale(2)
        this.setSize(this.width - 12, this.height - 20)

        if(!facingRight)
        {
            this.flipX = true
        }
    }
}