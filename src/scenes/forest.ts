import forestTilemapJSON from "../assets/tiles/forest.json";
// import type { Magic } from "../entity/magic.ts";
import { Player } from "../entity/player.ts";
import { TILES, SIZE, LAYERS, SPRITES } from "../utils/constants.ts";

export class Forest extends Phaser.Scene {
  private player?: Player;
  // private magic?: Magic;
  private pointer;

  constructor() {
    super("ForestScene");
  }

  preload() {
    this.load.image(TILES.FOREST, "src/assets/tiles/forest.png");
    this.load.tilemapTiledJSON("forestMap", "src/assets/tiles/forest.json");
    this.load.spritesheet(
      SPRITES.PLAYER,
      "src/assets/characters/player/player.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(SPRITES.MAGIC, "src/assets/magic/fire_skills.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(SPRITES.POINTER, "src/assets/pointer/pointer.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    //---MAP---
    const forestMap = this.make.tilemap({ key: "forestMap" });
    const tileSet = forestMap.addTilesetImage(
      forestTilemapJSON.tilesets[0].name,
      TILES.FOREST,
      SIZE.TILE,
      SIZE.TILE,
      0,
      1,
    );
    const groundLayer = forestMap.createLayer(LAYERS.GROUND, tileSet, 0, 0);
    const wallsLayer = forestMap.createLayer(LAYERS.WALLS, tileSet, 0, 0);
    //---MAP---

    //---PLAYER---
    this.player = new Player(this, 500, 200, SPRITES.PLAYER);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
      0,
      0,
      forestMap.widthInPixels,
      forestMap.heightInPixels,
    );
    this.cameras.main.setZoom(2);

    this.physics.world.setBounds(
      0,
      0,
      forestMap.widthInPixels,
      forestMap.heightInPixels,
    );
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, wallsLayer);
    wallsLayer.setCollisionByExclusion([-1]);
    this.scene.launch("UI")

    //---INPUT---
    this.input.setDefaultCursor("none");

    this.pointer = this.add.sprite(0, 0, SPRITES.POINTER);
    this.pointer.setDepth(1000);
    this.pointer.setScrollFactor(0);

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      this.pointer.setPosition(pointer.x, pointer.y);
    });
    //---INPUT---
  }

  update(_?: number, delta?: number): void {
    this.player.update();
  }
}
