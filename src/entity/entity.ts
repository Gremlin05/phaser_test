export class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string, target?: Phaser.Physics.Arcade.Sprite)
    {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

    }
}