
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
import { Interactable } from "../entity/interactable/interactable.ts";
import { EnergySphere } from "../entity/enemies/energy_sphere.ts";
import { EnergySpawner } from "../entity/enemies/energy_spawner.ts";
import { InventoryUI } from "./inventory/inventoryUI.ts";
import { Build } from "../entity/buildings/build.ts";


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
  private hoverEffectTextureKey: string;
  private redFlowerTextureKey: string;
  private greenFlowerTextureKey: string;
  private violetFlowerTextureKey: string;
  private energySphereTextureKey: string;
  private energySpawnerTextureKey: string;
  private craftTableTextureKey: string;

  private animsFrameRate: number;
  private highFrameRate: number = 12;

  private magicGroup: Phaser.Physics.Arcade.Group;
  private enemyGroup: Phaser.Physics.Arcade.Group;
  private enemyProjectileGroup: Phaser.Physics.Arcade.Group;
  private buildingGroup: Phaser.Physics.Arcade.Group;
  private buttonGroup: Phaser.Physics.Arcade.Group;
  private expGroup: Phaser.Physics.Arcade.Group;
  private interactableGroup: Phaser.Physics.Arcade.Group;
  private inventoryUI: InventoryUI;
  private inventoryKey: Phaser.Input.Keyboard.Key;
  

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
    this.hoverEffectTextureKey = SPRITES.INTERACTABLES.HOVER_EFFECT;
    this.redFlowerTextureKey = SPRITES.INTERACTABLES.RED_FLOWER;
    this.greenFlowerTextureKey = SPRITES.INTERACTABLES.GREEN_FLOWER;
    this.violetFlowerTextureKey = SPRITES.INTERACTABLES.VIOLET_FLOWER;
    this.energySphereTextureKey = SPRITES.ENEMIES.ENERGY_SPHERE;
    this.energySpawnerTextureKey = SPRITES.ENEMIES.ENERGY_SPAWNER;
    this.craftTableTextureKey = SPRITES.BUILDINGS.CRAFT_TABLE;


    this.animsFrameRate = 3;
  }

  preload() {
    this.load.image(TILES.FOREST, "assets/tiles/forest.png");
    this.load.tilemapTiledJSON("forestMap", "assets/tiles/forest.json");
    this.load.spritesheet(
      SPRITES.PLAYER,
      "assets/characters/player/player.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(SPRITES.MAGIC, "assets/magic/fire_skills.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(SPRITES.POINTER, "assets/pointer/pointer.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet(
      SPRITES.ENEMIES.SWORDMAN,
      "assets/characters/enemies/enemy_swordman.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.ENEMIES.ARCHER,
      "assets/characters/enemies/enemy_archer.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.WEAPONS.SWORD,
      "assets/weapons/weapons.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.WEAPONS.BOW,
      "assets/weapons/weapons.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.WEAPONS.ARRROW,
      "assets/weapons/arrow.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.BUILDINGS.ARCANE_GATES_COLUMN,
      "assets/buildings/arcane_gates_column.png",
      {
        frameWidth: 32,
        frameHeight: 72,
      },
    );

    this.load.spritesheet(
      SPRITES.BUILDINGS.ARCANE_GATES,
      "assets/buildings/arcane_gates.png",
      {
        frameWidth: 100,
        frameHeight: 49,
      },
    );

    this.load.spritesheet(
      SPRITES.BUILDINGS.BUTTON,
      "assets/buildings/button.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.BUILDINGS.PORTAL,
      "assets/buildings/portal.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.BUILDINGS.ARCANE_TOWER,
      "assets/buildings/arcane_tower.png",
      {
        frameWidth: 36,
        frameHeight: 72,
      },
    );

    this.load.spritesheet(
      SPRITES.BUILDINGS.FIRE_TOWER,
      "assets/buildings/fire_tower.png",
      {
        frameWidth: 32,
        frameHeight: 72,
      },
    );

    this.load.spritesheet(
      SPRITES.EXP_SPHERE,
      "assets/skillTree/exp_sphere.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.INTERACTABLES.AMETHYST_ORE,
      "assets/interactable/ore/ametisy_ore.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.INTERACTABLES.GOLD_ORE,
      "assets/interactable/ore/gold_ore.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.INTERACTABLES.EMERALD_ORE,
      "assets/interactable/ore/emerald_ore.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      SPRITES.INTERACTABLES.VIOLET_FLOWER,
      "assets/interactable/flowers/flower_violet.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      SPRITES.INTERACTABLES.GREEN_FLOWER,
      "assets/interactable/flowers/flower_green.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      SPRITES.INTERACTABLES.RED_FLOWER,
      "assets/interactable/flowers/flower_red.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      SPRITES.INTERACTABLES.HOVER_EFFECT,
      "assets/interactable/hover_effect.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.INTERACTABLES.INTERACT_ICON,
      "assets/interactable/interact_icon.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      SPRITES.ENEMIES.ENERGY_SPHERE,
      "assets/characters/enemies/energy_sphere.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      SPRITES.ENEMIES.ENERGY_SPAWNER,
      "assets/characters/enemies/energy_spawner.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );

    this.load.spritesheet(
      SPRITES.INTERACTABLES.MATERIALS_ICONS,
      "assets/interactable/icons/materials.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    this.load.spritesheet(
      SPRITES.BUILDINGS.CRAFT_TABLE,
      "assets/buildings/craft_table.png",
      {
        frameWidth: 64,
        frameHeight: 32,
      }
    );

    this.load.spritesheet(
      SPRITES.INTERACTABLES.POTIONS,
      "assets/interactable/potions.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
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

    //---ENERGY_SPHERE---
    this.anims.create({
      key: "energy_sphere",
      frames: this.anims.generateFrameNumbers(this.energySphereTextureKey, {
        start: 0,
        end: 14,
      }),
      frameRate: this.highFrameRate,
      repeat: -1,
    });
    //---ENERGY_SPHERE---

    //---ENERGY_SPAWNER---
    this.anims.create({
      key: "energy_spawner",
      frames: this.anims.generateFrameNumbers(this.energySpawnerTextureKey, {
        start: 0,
        end: 3,
      }),
      frameRate: this.highFrameRate,
      repeat: -1,
    });
    //---ENERGY_SPAWNER---

    //---PORTAL---
    this.anims.create({
      key: "portal",
      frames: this.anims.generateFrameNames(this.portalTextureKey, {
        start: 0,
        end: 4,
      }),
      frameRate: this.highFrameRate,
      repeat: -1,
    });
    //---PORTAL---

    //---ARCANE_TOWER---
    this.anims.create({
      key: "arcane_tower",
      frames: this.anims.generateFrameNames(this.arcaneTowerTextureKey, {
        start: 0,
        end: 1,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });
    //---ARCANE_TOWER---

    //---FIRE_TOWER---
    this.anims.create({
      key: "fire_tower",
      frames: this.anims.generateFrameNames(this.fireTowerTextureKey, {
        start: 0,
        end: 1,
      }),
      frameRate: this.animsFrameRate,
      repeat: -1,
    });
    //---FIRE_TOWER---

    //---EXP---
    this.anims.create({
      key: "exp",
      frames: this.anims.generateFrameNames(this.expTextureKey, {
        start: 0,
        end: 12,
      }),
      frameRate: this.highFrameRate,
      repeat: -1,
    });
    //---EXP---

    //---HOVER_EFFECT---
    this.anims.create({
      key: "hover",
      frames: this.anims.generateFrameNames(this.hoverEffectTextureKey, {
        start: 0,
        end: 5,
      }),
      frameRate: this.highFrameRate,
      repeat: -1,
    });
    //---HOVER_EFFECT---

    //---FLOWERS---
    this.anims.create({
      key: "red_flower",
      frames: this.anims.generateFrameNames(this.redFlowerTextureKey, {
        start: 0,
        end: 5,
      }),
      frameRate: this.highFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "green_flower",
      frames: this.anims.generateFrameNames(this.greenFlowerTextureKey, {
        start: 0,
        end: 5,
      }),
      frameRate: this.highFrameRate,
      repeat: -1,
    });

    this.anims.create({
      key: "violet_flower",
      frames: this.anims.generateFrameNames(this.violetFlowerTextureKey, {
        start: 0,
        end: 5,
      }),
      frameRate: this.highFrameRate,
      repeat: -1,
    });
    //---FLOWERS---

    this.events.on("inventoryChanged", (items) => {
      this.inventoryUI.updateInventory(items);
    });

    this.inventoryKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.I,
    );

    //#endregion ANIMS

    //#region MAP
    const forestMap = this.make.tilemap({ key: "forestMap" });
    const tileSet = forestMap.addTilesetImage(
      "forest_tiles",
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
    this.buildingGroup = this.physics.add.group();
    this.buttonGroup = this.physics.add.group();
    this.expGroup = this.physics.add.group();
    this.interactableGroup = this.physics.add.group();
    //#endregion GROUPS

    //#region  PLAYER

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "player") {
        this.player = new Player(
          this,
          obj.x,
          obj.y,
          SPRITES.PLAYER,
          this.magicGroup,
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
    this.scene.launch("SkillTreeManager");
    this.scene.launch("INV", {player: this.player})
    this.scene.launch("CRAFT_UI", { player: this.player });
    this.inventoryUI = this.scene.get("INV") as InventoryUI;
    //#endregion PLAYER

    //#region EXP
    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "exp") {
        const exp = new ExpSphere(this, obj.x, obj.y, SPRITES.EXP_SPHERE);

        this.expGroup.add(exp);
      }
    });
    //#endregion EXP

    //#region BUILDINGS

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "arcane_tower") {
        const building = new ArcaneTower(
          this,
          obj.x,
          obj.y,
          SPRITES.BUILDINGS.ARCANE_TOWER,
          this.player,
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
          this.player,
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
      if (obj.name === "craft_table") {
        const building = new Interactable(
          this,
          obj.x,
          obj.y - obj.height,
          this.craftTableTextureKey,
          "craftTable",
          "craft_table",
          this.player
        );
        building.setScale(1)

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
        this.buildingGroup.add(building);
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
        this.buttonGroup.add(button);
      }
    });
    //#endregion BUILDINGS

    //#region INTERACTABLES

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "gold_ore") {
        const interactable = new Interactable(
          this,
          obj.x,
          obj.y - obj.height,
          SPRITES.INTERACTABLES.GOLD_ORE,
          obj.name,
          obj.properties.find((p: any) => p.name === "type").value,
          this.player,
        );
        this.interactableGroup.add(interactable);
      }
    });

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "emerald_ore") {
        const interactable = new Interactable(
          this,
          obj.x,
          obj.y - obj.height,
          SPRITES.INTERACTABLES.EMERALD_ORE,
          obj.name,
          obj.properties.find((p: any) => p.name === "type").value,
          this.player,
        );
        this.interactableGroup.add(interactable);
      }
    });

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "amethyst_ore") {
        const interactable = new Interactable(
          this,
          obj.x,
          obj.y - obj.height,
          SPRITES.INTERACTABLES.AMETHYST_ORE,
          obj.name,
          obj.properties.find((p: any) => p.name === "type").value,
          this.player,
        );
        this.interactableGroup.add(interactable);
      }
    });

    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "red_flower") {
        const interactable = new Interactable(
          this,
          obj.x,
          obj.y - obj.height,
          SPRITES.INTERACTABLES.RED_FLOWER,
          obj.name,
          obj.properties.find((p: any) => p.name === "type").value,
          this.player,
        );
        this.interactableGroup.add(interactable);
      }
    });
    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "green_flower") {
        const interactable = new Interactable(
          this,
          obj.x,
          obj.y - obj.height,
          SPRITES.INTERACTABLES.GREEN_FLOWER,
          obj.name,
          obj.properties.find((p: any) => p.name === "type").value,
          this.player,
        );
        this.interactableGroup.add(interactable);
      }
    });
    this.objects.objects.forEach((obj: any) => {
      if (obj.name === "violet_flower") {
        const interactable = new Interactable(
          this,
          obj.x,
          obj.y - obj.height,
          SPRITES.INTERACTABLES.VIOLET_FLOWER,
          obj.name,
          obj.properties.find((p: any) => p.name === "type").value,
          this.player,
        );
        this.interactableGroup.add(interactable);
      }
    });

    //#endregion

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
          obj.properties.find((p: any) => p.name === "patrollingDirection")
            .value,
        );

        // this.enemies.push(enemy);
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

        // this.enemies.push(enemy);
        this.enemyGroup.add(enemy);
      }
      if (obj.name === "energy_sphere") {
        const enemy = new EnergySphere(
          this,
          obj.x,
          obj.y,
          SPRITES.ENEMIES.ENERGY_SPHERE,
          "energy_sphere",
          this.player,
          1,
        );

        // this.enemies.push(enemy);
        this.enemyGroup.add(enemy);
      }
      if (obj.name === "energy_spawner") {
        const enemy = new EnergySpawner(
          this,
          obj.x,
          obj.y,
          SPRITES.ENEMIES.ENERGY_SPHERE,
          "energy_spawner",
          this.player,
        );

        // this.enemies.push(enemy);
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

    //#region INTERACTABLES_INPUTS
    this.input.on(
      "gameobjectover",
      (_pointer: Phaser.Input.Pointer, gameObject: any) => {
        if (gameObject instanceof Interactable) {
          gameObject.showHoverEffect();
        }
      },
    );

    this.input.on(
      "gameobjectout",
      (_pointer: Phaser.Input.Pointer, gameObject: any) => {
        if (gameObject instanceof Interactable) {
          gameObject.hideHoverEffect();
        }
      },
    );

    //#endregion INTERACTABLES_INPUTS

    //#region COLLIDERS
    this.physics.add.collider(this.enemyGroup, wallsLayer);
    this.physics.add.collider(this.player, this.buildingGroup);
    this.physics.add.collider(this.enemyGroup, this.buildingGroup);
    this.physics.add.collider(this.player, this.interactableGroup);

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

    this.physics.add.collider(this.enemyGroup, this.enemyGroup);
    this.physics.add.overlap(
      this.player,
      this.expGroup,
      (player: any, exp: any) => {
        player.getExp();
        exp.destroy();
      },
    );
    //#endregion COLLIDERS

    //#region INPUTS
    this.input.keyboard.on("keydown-T", () => {
      if (this.scene.isSleeping("SkillTreeManager")) {
        this.scene.wake("SkillTreeManager");
      } else {
        this.scene.sleep("SkillTreeManager");
      }
    });
    //#endregion INPUTS
  }

  update(_?: number, __?: number): void {
    this.player.update();
    if (Phaser.Input.Keyboard.JustDown(this.inventoryKey)) {
      this.inventoryUI.toggle();
      console.log("INV");
      console.log(this.inventoryUI)
    }

    this.enemyGroup.children.each((child: any) => {
      if (child.update) {
        child.update();
      }
      return true;
    });

    this.buttonGroup.children.each((child: any) => {
      if (child.update) {
        child.update();
      }
      return true;
    });

    this.buildingGroup.children.each((child: any) => {
      if (child.update) {
        child.update();
      }
      return true;
    });

    this.interactableGroup.children.each((child: any) => {
      if (child.update) {
        child.update();
      }
      return true;
    });
  }
}
