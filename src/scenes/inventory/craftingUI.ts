import { Player } from "../../entity/player";
import { SPRITES } from "../../utils/constants";
import { CraftSystem } from "./craftSystem";
import type { Recipe } from "./craftSystem";

export class CraftUI extends Phaser.Scene {
  private container!: Phaser.GameObjects.Container;
  private player!: Player;

  private recipes: Recipe[] = [];

  constructor() {
    super("CRAFT_UI");
  }

  create(data: { player: Player }) {
    this.player = data.player;

    const cam = this.cameras.main;

    this.container = this.add.container(0, 0);
    this.container.setDepth(1000);

    const bg = this.add.rectangle(
      cam.width / 2,
      cam.height / 2,
      520,
      320,
      0x000000,
      0.85
    );

    this.container.add(bg);

    this.recipes = [
      {
        id: "health_potion",
        result: {
          id: "health_potion",
          name: "Health Potion",
          texture: SPRITES.INTERACTABLES.POTIONS,
          frame: 0,
        },
        ingredients: [
          { id: "green_flower", amount: 1 },
          { id: "emerald_ore", amount: 1 },
        ],
      },
      {
        id: "mana_potion",
        result: {
          id: "mana_potion",
          name: "Mana Potion",
          texture: SPRITES.INTERACTABLES.POTIONS,
          frame: 1,
        },
        ingredients: [
          { id: "violet_flower", amount: 1 },
          { id: "amethyst_ore", amount: 1 },
        ],
      },
      {
        id: "damage_potion",
        result: {
          id: "damage_potion",
          name: "Damage Potion",
          texture: SPRITES.INTERACTABLES.POTIONS,
          frame: 2,
        },
        ingredients: [
          { id: "red_flower", amount: 1 },
          { id: "gold_ore", amount: 1 },
        ],
      },
    ];

    this.drawRecipes(cam);
  }

  private drawRecipes(cam: Phaser.Cameras.Scene2D.Camera) {
    const startY = cam.height / 2 - 100;

    this.recipes.forEach((recipe, index) => {
      const y = startY + index * 90;

      // ===== RESULT ICON (CLICKABLE) =====
      const resultIcon = this.add
        .image(cam.width / 2 - 200, y, recipe.result.texture, recipe.result.frame)
        .setScale(1.2)
        .setInteractive({ useHandCursor: true });

      // CLICK
      resultIcon.on("pointerdown", () => {
        const success = CraftSystem.craft(this.player.inventory, recipe);

        if (success) {
          this.events.emit(
            "inventoryChanged",
            this.player.inventory.getItems()
          );
        }
      });

      // HOVER EFFECT
      resultIcon.on("pointerover", () => {
        resultIcon.setScale(1.35);
      });

      resultIcon.on("pointerout", () => {
        resultIcon.setScale(1.2);
      });

      // ===== NAME =====
      const nameText = this.add.text(
        cam.width / 2 - 160,
        y - 10,
        recipe.result.name,
        {
          fontSize: "14px",
          color: "#ffffff",
        }
      );

      // ===== INGREDIENTS =====
      let offsetX = cam.width / 2 - 20;

      recipe.ingredients.forEach((ing) => {
        const icon = this.add.image(offsetX, y, SPRITES.INTERACTABLES.MATERIALS_ICONS, 0)
          .setScale(1);

        offsetX += 40;

        this.container.add(icon);
      });

      this.container.add([resultIcon, nameText]);
    });
  }

  public open() {
    this.container.setVisible(true);
  }

  public close() {
    this.container.setVisible(false);
  }

  public toggle() {
    this.container.setVisible(!this.container.visible);
  }
}