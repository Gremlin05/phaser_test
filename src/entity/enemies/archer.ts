import { Enemy } from "./enemy";
import { Player } from "../player";

export class Archer extends Enemy {
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type: string, target: Player)
    {
        super(scene, x, y, texture, type, target)

        
    }

   

    dealDamage(): void {
        
    }

    agro(): void {
        
    }

    movement(): void {
        
    }
}