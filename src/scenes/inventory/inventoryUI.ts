import type { Player } from "../../entity/player";
import { SPRITES } from "../../utils/constants";
import type { InventoryItem } from "./inventory";

export class InventoryUI extends Phaser.Scene {
  private container!: Phaser.GameObjects.Container;
  private background!: Phaser.GameObjects.Rectangle;

  private slots: Phaser.GameObjects.Rectangle[] = [];
  private itemTexts: Phaser.GameObjects.Text[] = [];

  private player!: Player;

  private readonly COLS = 5;
  private readonly SLOT_SIZE = 45;
  private readonly PADDING = 10;

  private isReady = false;

  constructor() {
    super("INV");
  }

  create(data: { player: Player }) {
    this.player = data.player;

    const cam = this.cameras.main;

    const bgWidth = 285;
    const bgHeight = 230;

    const centerX = cam.width / 2;
    const centerY = cam.height / 2;

    this.container = this.add.container(0, 0);
    this.container.setDepth(999);
    

    this.background = this.add.rectangle(
      centerX - bgWidth / 2,
      centerY - bgHeight / 2,
      bgWidth,
      bgHeight,
      0x222222,
      0.9
    ).setOrigin(0);

    this.container.add(this.background);

    this.slots = [];

    for (let i = 0; i < 20; i++) {
      const x =
        centerX -
        bgWidth / 2 +
        this.PADDING +
        (i % this.COLS) * (this.SLOT_SIZE + 10);

      const y =
        centerY -
        bgHeight / 2 +
        this.PADDING +
        Math.floor(i / this.COLS) * (this.SLOT_SIZE + 10);

      const slot = this.add.rectangle(
        x,
        y,
        this.SLOT_SIZE,
        this.SLOT_SIZE,
        0x444444
      ).setOrigin(0);

      this.container.add(slot);
      this.slots.push(slot);
    }

    this.container.setVisible(false);

    this.isReady = true;
  }

  update(): void {
    if (!this.isReady) return;

    const cam = this.cameras.main;

    const centerX = cam.width / 2;
    const centerY = cam.height / 2;

    const bgWidth = 350;
    const bgHeight = 150;

    this.background.setPosition(
      centerX - bgWidth / 2,
      centerY - bgHeight / 2
    );

    for (let i = 0; i < this.slots.length; i++) {
      const x =
        centerX -
        bgWidth / 2 +
        this.PADDING +
        (i % this.COLS) * (this.SLOT_SIZE + 10);

      const y =
        centerY -
        bgHeight / 2 +
        this.PADDING +
        Math.floor(i / this.COLS) * (this.SLOT_SIZE + 10);

      this.slots[i].setPosition(x, y);
    }

    this.itemTexts.forEach((t, i) => {
      const x =
        centerX -
        bgWidth / 2 +
        this.PADDING +
        (i % this.COLS) * (this.SLOT_SIZE + 10) +
        3;

      const y =
        centerY -
        bgHeight / 2 +
        this.PADDING +
        Math.floor(i / this.COLS) * (this.SLOT_SIZE + 10) +
        3;

      t.setPosition(x, y);
    });
  }

  public toggle(): void {
    if (!this.isReady || !this.container) return;

    this.container.setVisible(!this.container.visible);
    console.log("toggle")
  }

  public show(): void {
    if (!this.isReady) return;

    this.container.setVisible(true);
  }

  public hide(): void {
    if (!this.isReady) return;

    this.container.setVisible(false);
  }

  public updateInventory(items: InventoryItem[]): void {
    if (!this.isReady) return;

    this.itemTexts.forEach(t => t.destroy());
    this.itemTexts = [];

    const cam = this.cameras.main;

    const centerX = cam.width / 2;
    const centerY = cam.height / 2;

    const bgWidth = 350;
    const bgHeight = 150;

    items.forEach((item, index) => {
      if (index >= this.slots.length) return;

      const x =
        centerX -
        bgWidth / 2 +
        this.PADDING +
        (index % this.COLS) * (this.SLOT_SIZE + 10);

      const y =
        centerY -
        bgHeight / 2 +
        this.PADDING +
        Math.floor(index / this.COLS) * (this.SLOT_SIZE + 10);

      const image = this.add.image(
        x + 22,
        y + 22,
        item.texture,
        item.frame,
      );
      

      this.container.add(image);
      
    });
  }
}