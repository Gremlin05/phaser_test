import { SPRITES, UI_PROPERTIES } from "../utils/constants";
import { Player } from "../entity/player";
import type { Enemy } from "../entity/enemies/enemy";

export class UI extends Phaser.Scene {
  private hpWidth;
  private manaWidth;
  private enemyHpWidth;

  private skillContainer: Phaser.GameObjects.Container;

  private hpBar: Phaser.GameObjects.Rectangle;
  private manaBar: Phaser.GameObjects.Rectangle;

  private hpText: Phaser.GameObjects.Text;
  private manaText: Phaser.GameObjects.Text;

  private currentEnemyHead: Phaser.GameObjects.Image;
  private enemyFrame: Phaser.GameObjects.Image;

  private enemyHpBar: Phaser.GameObjects.Rectangle;
  private enemyHpText: Phaser.GameObjects.Text;

  private player: Player;
  private lastTarget: Enemy | null = null;

  constructor() {
    super("UI");
    this.hpWidth = UI_PROPERTIES.HP_UI.width;
    this.manaWidth = UI_PROPERTIES.MANA_UI.width;
    this.enemyHpWidth = UI_PROPERTIES.HP_UI.width;
  }

  preload() {
    this.load.spritesheet(
      SPRITES.HEADS.PLAYER_HEAD,
      "src/assets/heads/heads.png",
      { frameWidth: 30, frameHeight: 30 },
    );

    this.load.spritesheet(
      SPRITES.HEADS.SWORDMAN_HEAD,
      "src/assets/heads/heads.png",
      { frameWidth: 30, frameHeight: 30 },
    );

    this.load.spritesheet(
      SPRITES.HEADS.ARCHER_HEAD,
      "src/assets/heads/heads.png",
      { frameWidth: 30, frameHeight: 30 },
    );

    this.load.spritesheet(
      SPRITES.HEADS.HEAD_FRAME,
      "src/assets/heads/head_frame.png",
      { frameWidth: 36, frameHeight: 36 },
    );

    this.load.spritesheet(
      SPRITES.SKILL_ICONS.AURA,
      "src/assets/icons/skills/skills.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.SKILL_ICONS.AOE,
      "src/assets/icons/skills/skills.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.SKILL_ICONS.BOLT,
      "src/assets/icons/skills/skills.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.SKILL_KEYS.ONE,
      "src/assets/icons/keys/keys.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.SKILL_KEYS.TWO,
      "src/assets/icons/keys/keys.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.SKILL_KEYS.THREE,
      "src/assets/icons/keys/keys.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
  }

  create() {
    const gameScene = this.scene.get("ForestScene") as any;
    this.player = gameScene.player;

    this.skillContainer = this.add.container(50, 600)

    const size = 64
    const padding = 2;

    const skills = [SPRITES.SKILL_ICONS.AURA,SPRITES.SKILL_ICONS.AOE, SPRITES.SKILL_ICONS.BOLT]

    skills.forEach((key, i) => {
      const icon = this.add.image(0, 0, key, i).setDisplaySize(size, size);

      icon.x = i * (size + padding);
      icon.y = 0;

      this.skillContainer.add(icon);
    });


    const keys = [SPRITES.SKILL_KEYS.ONE, SPRITES.SKILL_KEYS.TWO, SPRITES.SKILL_KEYS.THREE];

    keys.forEach((key, i) => {
      const icon = this.add.image(0, 0, key, i).setDisplaySize(size, size);

      icon.x = i * (size + padding);
      icon.y = size + padding;

      this.skillContainer.add(icon);
    });
  

    this.add.image(95, 95, SPRITES.HEADS.HEAD_FRAME).setScale(4);

    this.add.image(95, 95, SPRITES.HEADS.PLAYER_HEAD).setScale(4);

    this.hpText = this.add.text(
      UI_PROPERTIES.HP_UI.x,
      UI_PROPERTIES.HP_UI.y,
      UI_PROPERTIES.HP_UI.text,
      {
        fontSize: UI_PROPERTIES.FONT_SIZE,
        color: UI_PROPERTIES.COLORS.hpText,
      },
    );

    this.manaText = this.add.text(
      UI_PROPERTIES.MANA_UI.x,
      UI_PROPERTIES.MANA_UI.y,
      UI_PROPERTIES.MANA_UI.text,
      {
        fontSize: UI_PROPERTIES.FONT_SIZE,
        color: UI_PROPERTIES.COLORS.manaText,
      },
    );

    this.hpBar = this.add.rectangle(
      UI_PROPERTIES.HP_UI.x,
      UI_PROPERTIES.HP_UI.y,
      UI_PROPERTIES.HP_UI.width,
      UI_PROPERTIES.HP_UI.height,
      UI_PROPERTIES.COLORS.hpBackground,
    );

    this.manaBar = this.add.rectangle(
      UI_PROPERTIES.MANA_UI.x,
      UI_PROPERTIES.MANA_UI.y,
      UI_PROPERTIES.MANA_UI.width,
      UI_PROPERTIES.MANA_UI.height,
      UI_PROPERTIES.COLORS.manaBackground,
    );

    this.hpText.setDepth(1).setOrigin(0, 0.5);
    this.manaText.setDepth(1).setOrigin(0, 0.5);

    this.hpBar.setOrigin(0, 0.5);
    this.manaBar.setOrigin(0, 0.5);

    this.enemyFrame = this.add
      .image(400, 95, SPRITES.HEADS.HEAD_FRAME)
      .setScale(4)
      .setVisible(false);

    this.currentEnemyHead = this.add
      .image(400, 95, SPRITES.HEADS.SWORDMAN_HEAD)
      .setScale(4)
      .setVisible(false);

    this.enemyHpBar = this.add.rectangle(
      330,
      UI_PROPERTIES.HP_UI.y,
      UI_PROPERTIES.HP_UI.width,
      UI_PROPERTIES.HP_UI.height,
      UI_PROPERTIES.COLORS.hpBackground,
    );

    this.enemyHpBar.setOrigin(0, 0.5);
    this.enemyHpBar.setVisible(false);

    this.enemyHpText = this.add.text(
      330,
      UI_PROPERTIES.HP_UI.y,
      UI_PROPERTIES.HP_UI.text,
      {
        fontSize: UI_PROPERTIES.FONT_SIZE,
        color: UI_PROPERTIES.COLORS.hpText,
      },
    );
    this.enemyHpText.setDepth(1).setOrigin(0, 0.5).setVisible(false);

    gameScene.events.on("player:manaChanged", (mana: number) => {
      this.manaWidth = Phaser.Math.Clamp(mana, 0, UI_PROPERTIES.MANA_UI.width);
      this.manaBar.setSize(this.manaWidth, UI_PROPERTIES.MANA_UI.height);
    });

    gameScene.events.on("player:hpChanged", (hp: number) => {
      this.hpWidth = Phaser.Math.Clamp(hp, 0, UI_PROPERTIES.HP_UI.width);
      this.hpBar.setSize(this.hpWidth, UI_PROPERTIES.HP_UI.height);
    });

    gameScene.events.on(
      "enemy:hpChanged",
      (enemy: Enemy, hp: number, maxHp: number) => {
        const current = this.player?.currentTarget as Enemy | null;
        if (!current || current !== enemy) return;

        const ratio = maxHp > 0 ? hp / maxHp : 0;
        this.enemyHpWidth = Phaser.Math.Clamp(
          UI_PROPERTIES.HP_UI.width * ratio,
          0,
          UI_PROPERTIES.HP_UI.width,
        );
        this.enemyHpBar.setSize(this.enemyHpWidth, UI_PROPERTIES.HP_UI.height);
      },
    );

    

    
  }

  update(): void {
    if (!this.player) return;

    const target = (this.player.currentTarget as Enemy | null) ?? null;

    if (!target || !target.active) {
      this.enemyFrame.setVisible(false);
      this.currentEnemyHead.setVisible(false);
      this.enemyHpBar.setVisible(false);
      this.enemyHpText.setVisible(false);
      this.lastTarget = null;
      return;
    }

    this.enemyFrame.setVisible(true);
    this.currentEnemyHead.setVisible(true);
    this.enemyHpBar.setVisible(true);
    this.enemyHpText.setVisible(true);

    if (this.lastTarget !== target) {
      this.lastTarget = target;
      const hp = target.getHp();
      const maxHp = target.getMaxHp();
      const ratio = maxHp > 0 ? hp / maxHp : 0;
      this.enemyHpWidth = Phaser.Math.Clamp(
        UI_PROPERTIES.HP_UI.width * ratio,
        0,
        UI_PROPERTIES.HP_UI.width,
      );
      this.enemyHpBar.setSize(this.enemyHpWidth, UI_PROPERTIES.HP_UI.height);
    }

    if (target.enemyType === "swordman") {
      this.currentEnemyHead.setTexture(SPRITES.HEADS.SWORDMAN_HEAD, 1);
    }

    if (target.enemyType === "archer") {
      this.currentEnemyHead.setTexture(SPRITES.HEADS.ARCHER_HEAD, 2);
    }
  }
}
