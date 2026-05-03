import forestTilemapJSON from "../assets/tiles/forest.json";
import { Enemy } from "../entity/enemies/enemy.ts";
import { Archer } from "../entity/enemies/archer.ts";
import { Swordman } from "../entity/enemies/swordman.ts";
import { Player } from "../entity/player.ts";
import {
  TILES,
  SIZE,
  LAYERS,
  SPRITES,
  MAGIC_PROPERTIES,
  ENEMIES_PROPERTIES,
} from "../utils/constants.ts";
import { ArcaneGatesColumns } from "../entity/buildings/arcane_gates_columns.ts";
import { ArcaneGates } from "../entity/buildings/arcane_gates.ts";
import { Button } from "../entity/button.ts";
import { Portal } from "../entity/buildings/portal.ts";
import { ArcaneTower } from "../entity/buildings/arcane_tower.ts";
import { FireTower } from "../entity/buildings/fire_tower.ts";
import { ExpSphere } from "../entity/exp.ts";

export class Forest extends Phaser.Scene {
  private player?: Player;
  private enemies: Enemy[] = [];

  private playerTextureKey: string;
  private swordmanTextureKey: string;
  private archerTextureKey: string;
  private portalTextureKey: string;
  private arcaneTowerTextureKey: string;
  private fireTowerTextureKey: string;
  private expTextureKey: string;

  private animsFrameRate: number;
  private highFrameRate: number = 12

  private magicGroup: Phaser.Physics.Arcade.Group;
  private enemyGroup: Phaser.Physics.Arcade.Group;
  private enemyProjectileGroup: Phaser.Physics.Arcade.Group;
  private buildingGroup: Phaser.Physics.Arcade.Group;
  private buttonGroup: Phaser.Physics.Arcade.Group;
  private expGroup: Phaser.Physics.Arcade.Group; 
  private glow: any;

  private objects: Phaser.Tilemaps.ObjectLayer;

  constructor() {
    super("ForestScene");

    this.playerTextureKey = SPRITES.PLAYER;
    this.swordmanTextureKey = SPRITES.ENEMIES.SWORDMAN;
    this.archerTextureKey = SPRITES.ENEMIES.ARCHER;
    this.portalTextureKey = SPRITES.BUILDINGS.PORTAL;
    this.arcaneTowerTextureKey = SPRITES.BUILDINGS.ARCANE_TOWER;
    this.fireTowerTextureKey = SPRITES.BUILDINGS.FIRE_TOWER;
    this.expTextureKey = SPRITES.EXP_SPHERE;
    this.animsFrameRate = 3;
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
    this.load.spritesheet(
      SPRITES.ENEMIES.SWORDMAN,
      "src/assets/characters/enemies/enemy_swordman.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.ENEMIES.ARCHER,
      "src/assets/characters/enemies/enemy_archer.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.WEAPONS.SWORD,
      "src/assets/weapons/weapons.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.WEAPONS.BOW,
      "src/assets/weapons/weapons.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.WEAPONS.ARRROW,
      "src/assets/weapons/arrow.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.BUILDINGS.ARCANE_GATES_COLUMN,
      "src/assets/buildings/arcane_gates_column.png",
      {
        frameWidth: 32,
        frameHeight: 72,
      },
    );

    this.load.spritesheet(
      SPRITES.BUILDINGS.ARCANE_GATES,
      "src/assets/buildings/arcane_gates.png",
      {
        frameWidth: 100,
        frameHeight: 49,
      },
    )

    this.load.spritesheet(
      SPRITES.BUILDINGS.BUTTON,
      "src/assets/buildings/button.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    )

    this.load.spritesheet(
      SPRITES.BUILDINGS.PORTAL,
      "src/assets/buildings/portal.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    )

    this.load.spritesheet(
      SPRITES.BUILDINGS.ARCANE_TOWER,
      "src/assets/buildings/arcane_tower.png",
      {
        frameWidth: 36,
        frameHeight: 72,
      }
    )

    this.load.spritesheet(
      SPRITES.BUILDINGS.FIRE_TOWER,
      "src/assets/buildings/fire_tower.png",
      {
        frameWidth: 32,
        frameHeight: 72,
      }
    )

    this.load.spritesheet(
      SPRITES.EXP_SPHERE,
      "src/assets/skillTree/exp_sphere.png",
      {
        frameWidth: 32,
        frameHeight: 32
      }
    )
  }

  create() {
    //#region  ANIMS

    //------PLAYER------
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers(this.playerTextureKey, {
        start: 0,
        end: 1,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers(this.playerTextureKey, {
        start: 2,
        end: 3,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(this.playerTextureKey, {
        start: 4,
        end: 5,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers(this.playerTextureKey, {
        start: 6,
        end: 7,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers(this.playerTextureKey, {
        start: 8,
        end: 9,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });
    //---PLAYER---

    //---ARCHER---
    this.anims.create({
      key: "archer_idle",
      frames: this.anims.generateFrameNumbers(this.archerTextureKey, {
        start: 0,
        end: 1,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "archer_down",
      frames: this.anims.generateFrameNumbers(this.archerTextureKey, {
        start: 4,
        end: 5,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "archer_right",
      frames: this.anims.generateFrameNumbers(this.archerTextureKey, {
        start: 6,
        end: 7,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "archer_left",
      frames: this.anims.generateFrameNumbers(this.archerTextureKey, {
        start: 8,
        end: 9,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "archer_up",
      frames: this.anims.generateFrameNumbers(this.archerTextureKey, {
        start: 2,
        end: 3,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });
    //---ARCHER---

    //---SWORDMAN---
    this.anims.create({
      key: "swordman_idle",
      frames: this.anims.generateFrameNumbers(this.swordmanTextureKey, {
        start: 0,
        end: 1,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "swordman_down",
      frames: this.anims.generateFrameNumbers(this.swordmanTextureKey, {
        start: 6,
        end: 7,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "swordman_right",
      frames: this.anims.generateFrameNumbers(this.swordmanTextureKey, {
        start: 2,
        end: 3,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "swordman_left",
      frames: this.anims.generateFrameNumbers(this.swordmanTextureKey, {
        start: 4,
        end: 5,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "swordman_up",
      frames: this.anims.generateFrameNumbers(this.swordmanTextureKey, {
        start: 8,
        end: 9,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });
    //---SWORDMAN---

    //---PORTAL---
    this.anims.create({
      key: "portal",
      frames: this.anims.generateFrameNames(this.portalTextureKey,{
        start:0,
        end:4
      }),
      frameRate: this.highFrameRate,
      repeat: -1
    });
    //---PORTAL---

    //---ARCANE_TOWER---
    this.anims.create({
      key: "arcane_tower",
      frames: this.anims.generateFrameNames(this.arcaneTowerTextureKey,{
        start: 0,
        end: 1,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1
    })
    //---ARCANE_TOWER---

    //---FIRE_TOWER---
    this.anims.create({
      key: "fire_tower",
      frames: this.anims.generateFrameNames(this.fireTowerTextureKey,{
        start: 0,
        end: 1,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1
    })
    //---FIRE_TOWER---

    //---EXP---
    this.anims.create({
      key: "exp",
      frames: this.anims.generateFrameNames(this.expTextureKey,{
        start: 0,
        end: 12,
      }),
      frameRate: this.highFrameRate,
      repeat: -1
    })
    //---EXP---

    //#endregion ANIMS

    //#region MAP
    const forestMap = this.make.tilemap({ key: "forestMap" });
    const tileSet = forestMap.addTilesetImage(
      forestTilemapJSON.tilesets[0].name,
      TILES.FOREST,
      SIZE.TILE,
      SIZE.TILE,
      0,
      1,
    );
    this.objects = forestMap.getObjectLayer("objects");
    forestMap.createLayer(LAYERS.GROUND, tileSet, 0, 0);
    const wallsLayer = forestMap.createLayer(LAYERS.WALLS, tileSet, 0, 0);
    //#endregion MAP

    //#region GROUPS
    this.magicGroup = this.physics.add.group();
    this.enemyGroup = this.physics.add.group();
    this.enemyProjectileGroup = this.physics.add.group();
    this.buildingGroup = this.physics.add.group()
    this.buttonGroup = this.physics.add.group();
    this.expGroup = this.physics.add.group();
    //#endregion GROUPS

    //#region  PLAYER

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "player") {
        this.player = new Player(
          this,
          obj.x,
          obj.y,
          SPRITES.PLAYER,
          this.magicGroup
          
        );
      }
    });

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
      0,
      0,
      forestMap.widthInPixels,
      forestMap.heightInPixels,
    );
    this.cameras.main.startFollow(this.player, true);
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
    this.scene.launch("UI");
    this.scene.launch("SkillTreeManager")
    //#endregion PLAYER

    //#region EXP
    this.objects.objects.forEach((obj: any) =>
    {
       if (obj.name === "exp") {
        const exp = new ExpSphere(
          this,
          obj.x,
          obj.y,
          SPRITES.EXP_SPHERE,
        );

        this.expGroup.add(exp);
      }
    })
    //#endregion EXP

    //#region BUILDINGS

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "arcane_tower") {
        const building = new ArcaneTower(
          this,
          obj.x,
          obj.y,
          SPRITES.BUILDINGS.ARCANE_TOWER,
          this.player
        );

        this.buildingGroup.add(building);
      }
    });

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "fire_tower") {
        const building = new FireTower(
          this,
          obj.x,
          obj.y,
          SPRITES.BUILDINGS.FIRE_TOWER,
          this.player
        );

        this.buildingGroup.add(building);
      }
    });

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "portal") {
        const building = new Portal(
          this,
          obj.x,
          obj.y,
          SPRITES.BUILDINGS.PORTAL,
        );

        this.buildingGroup.add(building);
      }
    });

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "arcane_gates") {
        const building = new ArcaneGates(
          this,
          obj.x,
          obj.y - obj.height,
          SPRITES.BUILDINGS.ARCANE_GATES,
        );

        this.buildingGroup.add(building);
      }
    });

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "arcane_gates_column") {
        const building = new ArcaneGatesColumns(
          this,
          obj.x,
          obj.y - obj.height,
          SPRITES.BUILDINGS.ARCANE_GATES_COLUMN,
          obj.properties.find((p: any) => p.name === "facingRight").value,
        );
        this.buildingGroup.add(building)
      }
    });

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "button") {
        const button = new Button(
          this,
          obj.x,
          obj.y,
          SPRITES.BUILDINGS.BUTTON,
          this.player,
        );
        this.buttonGroup.add(button)
      }
    });
    //#endregion BUILDINGS

    //#region ENEMY
    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "swordman") {
        const enemy = new Swordman(
          this,
          obj.x,
          obj.y,
          SPRITES.ENEMIES.SWORDMAN,
          "swordman",
          this.player,
          obj.properties.find((p: any) => p.name === "isPatrolling").value,
          obj.properties.find((p: any) => p.name === "patrollingDirection").value,
        );

        this.enemies.push(enemy);
        this.enemyGroup.add(enemy);
      }
      if (obj.name === "archer") {
        const enemy = new Archer(
          this,
          obj.x,
          obj.y,
          SPRITES.ENEMIES.ARCHER,
          "archer",
          this.player,
          this.enemyProjectileGroup,
        );

        this.enemies.push(enemy);
        this.enemyGroup.add(enemy);
      }
    });

    //#endregion ENEMY

    //#region ENEMY_INPUTS
    this.input.on(
      "gameobjectover",
      (_pointer: Phaser.Input.Pointer, gameObject: any) => {
        if (gameObject instanceof Enemy) {
          this.glow = gameObject.postFX.addGlow(0xff0000, 2, 2, false, 0.1, 5);
          this.player.currentTarget = gameObject;
        }
      },
    );

    this.input.on(
      "gameobjectout",
      (_pointer: Phaser.Input.Pointer, gameObject: any) => {
        if (gameObject instanceof Enemy) {
          gameObject.postFX.remove(this.glow);
          this.player.currentTarget = null;
        }
      },
    );
    //#endregion ENEMY_INPUTS

    //#region COLLIDERS
    this.physics.add.collider(this.enemyGroup, wallsLayer);
    this.physics.add.collider(this.player, this.buildingGroup);
    this.physics.add.collider(this.enemyGroup, this.buildingGroup);

    this.physics.add.overlap(
      this.enemyGroup,
      this.magicGroup,
      (enemy: any, magic: any) => {
        if (magic.getType() === "Bolt") {
          enemy.takeDamage(MAGIC_PROPERTIES.BOLT.damage);
          magic.destroy();
        } else if (magic.getType() === "AOE") {
          enemy.takeDamage(MAGIC_PROPERTIES.AOE.damage);
        } else if (magic.getType() === "Aura") {
          enemy.takeDamage(MAGIC_PROPERTIES.AURA.damage);
        }
        console.log(enemy.hp);
      },
      null,
      this,
    );

    this.physics.add.overlap(
      this.player,
      this.enemyProjectileGroup,
      (player: any, projectile: any) => {
        if (projectile.hasHit === true) {
          return;
        }

        projectile.hasHit = true;
        projectile.destroy();
        player.takeDamage(ENEMIES_PROPERTIES.ARCHER.damage);
      },
    );

    this.physics.add.overlap(
      this.enemyProjectileGroup,
      this.magicGroup,
      (projectile: any, magic: any) => {
        if (magic.getType() === "Aura") {
          projectile.destroy();
        }
      },
    );

    // this.physics.add.collider(this.enemyGroup, this.enemyGroup);
    this.physics.add.overlap(this.player, this.expGroup, (player: any, exp: any) => {
      player.getExp()
      exp.destroy()
    })
    //#endregion COLLIDERS
  
    //#region INPUTS
    this.input.keyboard.on("keydown-T", () =>{
      if(this.scene.isSleeping("SkillTreeManager"))
      {
        this.scene.wake("SkillTreeManager")
      }
      else
      {
        this.scene.sleep("SkillTreeManager")
      }
    })
    //#endregion INPUTS
  }


  update(_?: number, __?: number): void {
    this.player.update();

    for (const enemy of this.enemies) {
      if (enemy.active) enemy.update();
    }

    this.buttonGroup.children.each((child: any) =>{
      if(child.update)
      {
        child.update()
      }
      return true
    })

    this.buildingGroup.children.each((child: any) =>{
      if(child.update)
      {
        child.update()
      }
      return true
    })
  }
}
