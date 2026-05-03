import { Player } from "../entity/player";
import { SKILL_TREE_TEXT, SPRITES } from "../utils/constants";

export class SkillTreeManager extends Phaser.Scene {
  private player: Player;

  private showTween: Phaser.Tweens.Tween;
  private hideTween: Phaser.Tweens.Tween;
  private toolTipContainer: Phaser.GameObjects.Container;
  private toolTipBackground: Phaser.GameObjects.Rectangle;
  private toolTipText: Phaser.GameObjects.Text;

  private skillTreeContainer!: Phaser.GameObjects.Image;

  private hpContainer!: Phaser.GameObjects.Container;
  private manaContainer!: Phaser.GameObjects.Container;
  private damageContainer!: Phaser.GameObjects.Container;

  private skillLines: Phaser.GameObjects.Image[][] = [];

  constructor() {
    super("SkillTreeManager");
    
  }

  preload() {
    this.load.image(
      SPRITES.SKILL_TREE.SKILL_TREE_CONTAINER,
      "src/assets/skillTree/empty_skill_tree.png",
    );

    this.load.spritesheet(
      SPRITES.SKILL_TREE.SKILLS.hp,
      "src/assets/skillTree/skill_tree_icons.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
  }

  create() {
    const gameScene = this.scene.get("ForestScene") as any;
    this.player = gameScene.player;
    this.scene.sleep("SkillTreeManager")

    this.toolTipContainer = this.add.container(0, 0).setDepth(999).setAlpha(0);
    this.toolTipText = this.add
      .text(0, 0, "", {
        fontSize: 28,
        color: "#ffffff",
      })
      .setOrigin(0.5, -0.2);
    // this.toolTipBackground = this.add.rectangle(0, 0, 75, 25, 0xffffff)

    // this.toolTipContainer.add(this.toolTipBackground)
    this.toolTipContainer.add(this.toolTipText);

    const { width, height } = this.cameras.main;

    this.skillTreeContainer = this.add
      .image(0, 0, SPRITES.SKILL_TREE.SKILL_TREE_CONTAINER)
      .setOrigin(0, 0)
      .setDepth(1);

    this.skillTreeContainer.displayWidth = width;
    this.skillTreeContainer.displayHeight = height;

    this.hpContainer = this.createSkillLine(150, 1, "hp");
    this.manaContainer = this.createSkillLine(350, 2, "mana");
    this.damageContainer = this.createSkillLine(550, 3, "damage");
  }

  private createSkillLine(
    y: number,
    activeFrame: number,
    type: string,
  ): Phaser.GameObjects.Container {
    const container = this.add.container(0, 0).setDepth(3);

    const startX = 160;
    const spacing = 475;

    const lineIcons: Phaser.GameObjects.Image[] = [];

    for (let i = 0; i < 3; i++) {
      const frame = i === 0 ? activeFrame : 0;

      const icon = this.add
        .image(startX + i * spacing, y, SPRITES.SKILL_TREE.SKILLS.hp, frame)
        .setScale(6)
        .setDepth(3);

      icon.setInteractive().on("pointerdown", () => {
        this.learnSkill(icon, type);
      });

      icon.setInteractive().on("pointerover", () => {
        this.showToolTip(icon.x, icon.y, type);
      });
      icon.setInteractive().on("pointerout", () => {
        this.hideToolTip();
      });

      container.add(icon);
      lineIcons.push(icon);
    }

    this.skillLines.push(lineIcons);

    return container;
  }

  private showToolTip(x: number, y: number, type: string): void {
    this.toolTipContainer.setPosition(x, y + 80);

    this.showTween = this.add.tween({
      targets: this.toolTipContainer,
      alpha: 1,
      duration: 150,
    });

    switch (type) {
      case "hp": {
        this.toolTipText.setText(SKILL_TREE_TEXT.HP);
        return;
      }
      case "mana": {
        this.toolTipText.setText(SKILL_TREE_TEXT.MANA);
        return;
      }
      case "damage": {
        this.toolTipText.setText(SKILL_TREE_TEXT.SPELL_DAMAGE);
        return;
      }
    }
  }

  private hideToolTip(): void {
    this.hideTween = this.add.tween({
      targets: this.toolTipContainer,
      alpha: 0,
      duration: 150,
    });
  }

  private learnSkill(icon: Phaser.GameObjects.Image, type): void {
    if (this.player.exp > 0) {
      switch (type) {
        case "hp": {
          icon.setFrame(1);
          this.player.exp--
          return;
        }
        case "mana": {
          icon.setFrame(2);
          this.player.exp--
          return;
        }
        case "damage": {
          icon.setFrame(3);
          this.player.exp--
          return;
        }
      }
    }
  }
}
