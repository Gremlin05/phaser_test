import { Entity } from "./entity";
import { SPRITES } from "../utils/constants";

export class Player extends Entity{
    textureKey: string;
    private movespeed: number

    private keys: Phaser.Types.Input.Keyboard.CursorKeys
    private skillKeys;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture, SPRITES.PLAYER);

        const anims = this.scene.anims;
        const animsFrameRate = 3;
        this.textureKey = texture;
        this.movespeed = 100;
        // this.setCircle(12, 4, 5)
        
        this.setSize(24, 24)
        this.setOffset(4,6)

        this.keys = scene.input.keyboard.createCursorKeys()
        this.skillKeys = scene.input.keyboard.addKeys("ONE, TWO, THREE")
        

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
            this.play("idle", true)
        }
    }

    castSkills() : void {
        if (Phaser.Input.Keyboard.JustDown(this.skillKeys.ONE))
        {
            console.log("FireBolt")
        }
        else if (Phaser.Input.Keyboard.JustDown(this.skillKeys.TWO))
        {
            console.log("AURA")
        }
        else if (Phaser.Input.Keyboard.JustDown(this.skillKeys.THREE))
        {
            console.log("AOE")
        }
    }

    update(): void {
        this.moveMent()
        this.castSkills()
    }
}