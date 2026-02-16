import forestTilemapJSON from "../assets/tiles/forest.json";
import type { Archer } from "../entity/enemies/archer.ts";
import { Swordman } from "../entity/enemies/swordman.ts";
import { Player } from "../entity/player.ts";
import { TILES, SIZE, LAYERS, SPRITES } from "../utils/constants.ts";

export class Forest extends Phaser.Scene {
  private player?: Player;
  private swordMan?: Swordman
  private archer?: Archer
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
    this.load.spritesheet(SPRITES.ENEMIES.SWORDMAN, "src/assets/characters/enemies/enemy_swordman.png",
      {
        frameWidth: 32,
        frameHeight: 32
      }
    )

    this.load.spritesheet(SPRITES.ENEMIES.ARCHER, "src/assets/characters/enemies/enemy_archer.png",{
      frameWidth: 32,
      frameHeight: 32,
    })
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
    this.cameras.main.startFollow(this.player, true)
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

    //---ENEMY---
    this.swordMan = new Swordman(this, 200, 200,SPRITES.ENEMIES.SWORDMAN,"swordman", this.player )
    this.swordMan = new Swordman(this, 500, 100,SPRITES.ENEMIES.ARCHER,"archer", this.player )
    
    //---ENEMY---

    
  }

  update(_?: number, delta?: number): void {
    
    this.player.update();
  }
}
