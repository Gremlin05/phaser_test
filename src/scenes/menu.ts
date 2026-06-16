import { SPRITES } from "../utils/constants";

export class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {
    this.load.image(SPRITES.UI.BACKGROUND, "assets/UI/background.png");
    this.load.spritesheet(
      SPRITES.UI.PLAY_BUTTON,
      "assets/UI/play_button.png",
      {
        frameWidth: 75,
        frameHeight: 25,
      },
    );
  }

  create() {
    const { width, height } = this.scale;

    const background = this.add.image(0, 0, SPRITES.UI.BACKGROUND).setOrigin(0);

    const scale = Math.max(
      this.scale.width / background.width,
      this.scale.height / background.height,
    );

    background.setScale(scale);
    const playButton = this.add
      .image(width / 2, height / 2, SPRITES.UI.PLAY_BUTTON, 0)
      .setScale(3)
      .setInteractive();

    playButton.on("pointerdown", () => {
      this.scene.start("ForestScene");
    });

    playButton.on("pointerover", () => {
      playButton.setFrame(2);
    });

    playButton.on("pointerout", () => {
      playButton.setFrame(0);
    });
  }
}
