import { Entity } from "../entity";
import type { Player } from "../player";

export abstract class Enemy extends Entity {

    protected hp!: number;
    protected maxHp: number = 0;
    protected damage!: number;
    protected speed!: number;
    protected distanceForAgro: number;
    protected target: Player;
    protected enemyState: string;
    protected spawnX: number;
    protected spawnY: number;
    protected textureKey: string;
    public enemyType: string;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type: string, target: Player) {
        super(scene, x, y,texture, type, target)

        this.enemyType = type
        this.target = target
        this.setInteractive()
    }

    takeDamage(damageCount: number): void {
        this.hp -= damageCount;
        if (this.maxHp <= 0) this.maxHp = this.hp + damageCount;
        (this.scene).events.emit("enemy:hpChanged", this, this.hp, this.maxHp);
        if(this.hp <= 0)
        {
            this.die()
        }
    }

    public getHp(): number {
        return this.hp;
    }

    public getMaxHp(): number {
        return this.maxHp > 0 ? this.maxHp : this.hp;
    }

    die() : void {
        this.destroy()
    }

    abstract attack(): void;
    abstract chase(distance) : void
    abstract patrolling(): void;
    abstract checkDistance() : void;
    abstract changeState(state) : void;
}