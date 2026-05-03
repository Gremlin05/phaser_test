import { Entity } from "./entity";
import type { Player } from "./player";

export class Button extends Entity{

    private pressed: boolean;
    private wasPressedOnce: boolean;
    private player: Player;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, player: Player)
    {
        super(scene, x, y, texture);
        this.pressed = false;
        this.wasPressedOnce = false;
        this.player = player;
        this.setFrame(0);
    }

    public setPressed(pressed: boolean): void {
        if (this.pressed === pressed) return;
        this.pressed = pressed;
        this.setFrame(pressed ? 1 : 0);
    }

    update(): void {
        if (!this.player?.active) return;

        const onButton = Phaser.Geom.Intersects.RectangleToRectangle(
            this.player.getBounds(),
            this.getBounds(),
        );

        this.setPressed(onButton);

        if (onButton && !this.wasPressedOnce) {
            this.wasPressedOnce = true;
            this.scene.events.emit("button:pressedOnce");
        }
    }
}