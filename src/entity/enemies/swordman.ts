import { Enemy } from "./enemy";
import { Player } from "../player";
import { ENEMIES_PROPERTIES } from "../../utils/constants";

export class Swordman extends Enemy {
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type: string, target: Player)
    {
        super(scene, x, y, texture, type, target)

        this.hp = ENEMIES_PROPERTIES.SWORDMAN.hp
        this.damage = ENEMIES_PROPERTIES.SWORDMAN.damage
        this.speed = ENEMIES_PROPERTIES.SWORDMAN.speed
        this.distanceForAgro = ENEMIES_PROPERTIES.SWORDMAN.distanceForAgro


    }

   

    dealDamage(): void {
        
    }

    agro(): void {
        
    }

    movement(): void {
        
    }
}