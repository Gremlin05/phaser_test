import { Entity } from "./entity";
import { MAGIC_PROPERTIES } from "../utils/constants";

export class Magic extends Entity{

    private target?: Entity;
    private magicType: String;
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type: string, frame?: number, target?: Entity) {

        super(scene, x, y, texture, type)
        
        this.target = target
        this.magicType = type
        this.setFrame(frame)
        
        scene.events.on("update", this.update, this)

        if(this.magicType == "Bolt" )
        {   
            this.createMagic(MAGIC_PROPERTIES.BOLT.radius, MAGIC_PROPERTIES.BOLT.offsetX, MAGIC_PROPERTIES.BOLT.offsetY, MAGIC_PROPERTIES.BOLT.scaleRate, MAGIC_PROPERTIES.BOLT.lifetime)
        }
        else if (this.magicType == "AOE")
        {
            this.createMagic(MAGIC_PROPERTIES.AOE.radius, MAGIC_PROPERTIES.AOE.offsetX, MAGIC_PROPERTIES.AOE.offsetY, MAGIC_PROPERTIES.AOE.scaleRate, MAGIC_PROPERTIES.AOE.lifetime)        
        }
        else if (this.magicType == "Aura")
        {
            this.scene.tweens.add({
                targets: this, 
                angle: 360,
                repeat: -1,
                
            })
            this.createMagic(MAGIC_PROPERTIES.AURA.radius, MAGIC_PROPERTIES.AURA.offsetX, MAGIC_PROPERTIES.AURA.offsetY, MAGIC_PROPERTIES.AURA.scaleRate, MAGIC_PROPERTIES.AURA.lifetime)
            
        }
        else
        {
            return;
        }
    }

    update(): void {
        if(!this.target)
        {
            return;
        }
        
        if(this.magicType === "Aura")
        {
            this.setPosition(this.target.x, this.target.y)
        }        
    }

    createMagic(radius: number, offsetX: number, offsetY: number, scaleRate: number, lifetime: number): void
    {
        this.setCircle(radius, offsetX, offsetY);
        this.scale = scaleRate;

        this.scene.time.delayedCall(lifetime, () => [
            this.once(Phaser.GameObjects.Events.DESTROY, () => {
                this.scene.events.off("update", this.update, this)
            }),
            this.destroy()
        ]);
    }
}