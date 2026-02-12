import { Entity } from "./entity";
import { SPRITES } from "../utils/constants";
import { Magic } from "./magic";
import { LEFT } from "phaser";

export class Player extends Entity{
    textureKey: string;
    private movespeed: number

    private keys: Phaser.Types.Input.Keyboard.CursorKeys
    private skillKeys;
    private skill: Magic;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture, SPRITES.PLAYER);


        const anims = this.scene.anims;
        const animsFrameRate = 3;
        this.textureKey = texture;
        this.movespeed = 100;
        
        
        this.setSize(24, 24)
        this.setOffset(4,6)

        this.keys = scene.input.keyboard.createCursorKeys()
        this.skillKeys = scene.input.keyboard.addKeys("Q, W, E")
        

        anims.create({
            key: "idle",
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 0,
                end: 1
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: "down",
            frames: anims.generateFrameNumbers(this.textureKey,{
                start: 2,
                end: 3

            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: "right",
            frames: anims.generateFrameNumbers(this.textureKey,{
                start: 4,
                end: 5
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: "left",
            frames: anims.generateFrameNumbers(this.textureKey,{
                start: 6,
                end: 7
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: "up",
            frames: anims.generateFrameNumbers(this.textureKey,{
                start: 8,
                end: 9
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        
    }

    moveMent() : void {
        if(this.keys.up.isDown)
        {
            this.play("up", true)
            this.setVelocityY(-this.movespeed)
            this.setVelocityX(0)
        }
        else if (this.keys.down.isDown)
        {
            this.play("down", true)
            this.setVelocityY(this.movespeed)
            this.setVelocityX(0)
        }
        else if (this.keys.left.isDown)
        {
            this.play("left", true)
            this.setVelocityX(-this.movespeed)
            this.setVelocityY(0)
        }
        else if (this.keys.right.isDown)
        {
            this.play("right", true)
            this.setVelocityX(this.movespeed)
            this.setVelocityY(0)
        }
        else
        {
            this.setVelocity(0,0)
            this.stop()
        }
    }

    castSkills() : Magic {
        if (Phaser.Input.Keyboard.JustDown(this.skillKeys.Q))
        {
            return(this.skill = new Magic(this.scene, this.x, this.y, SPRITES.MAGIC, "Aura", 0, this));
        }
        else if (Phaser.Input.Keyboard.JustDown(this.skillKeys.W))
        {
            return(this.skill = new Magic(this.scene, this.x, this.y, SPRITES.MAGIC, "AOE", 1));
        }
        else if (Phaser.Input.Keyboard.JustDown(this.skillKeys.E))
        {
            
            return(this.skill = new Magic(this.scene, this.x, this.y, SPRITES.MAGIC, "Bolt", 2,));
        }
    }

    update(): void {
        console.log()
        this.moveMent()
        this.castSkills()
    }
}