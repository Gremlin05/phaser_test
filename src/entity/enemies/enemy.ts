import { Entity } from "../entity";
import type { Player } from "../player";

export abstract class Enemy extends Entity {

    protected hp!: number;
    protected damage!: number;
    protected speed!: number;
    protected distanceForAgro: number;
    protected target: Player;
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type: string, target: Player) {
        super(scene, x, y,texture, type, target)

        this.target = target
        
    }

    takeDamage(damageCount: number): void {
        this.hp -= damageCount;
        if(this.hp <= 0)
        {
            this.die()
        }
    }

    die() : void {
        this.destroy()
    }

    abstract dealDamage(): void;
    abstract agro() : void
    abstract movement(): void;
}