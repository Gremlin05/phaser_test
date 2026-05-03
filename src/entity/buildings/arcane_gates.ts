import { Build } from "./build";

export class ArcaneGates extends Build{

    
    private openedOnce: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture)

        this.setScale(2)
        this.openedOnce = false;
        this.setSize(this.width, this.height - 10)

        this.scene.events.on("button:pressedOnce", () => {
            this.openOnce();
        });
    }

    private openOnce(): void {
        if (this.openedOnce) return;
        this.openedOnce = true;
        

        this.setVisible(false);
        this.setActive(false);

        const body = this.body as Phaser.Physics.Arcade.Body | null;
        body?.setEnable(false);
    }
}