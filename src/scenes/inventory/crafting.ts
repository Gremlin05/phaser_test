export type CraftRecipe = {
  result: {
    id: string;
    name: string;
    texture: string;
    frame: number;
  };
  ingredients: { id: string; amount: number }[];
};

export const CRAFT_RECIPES: CraftRecipe[] = [
  {
    result: {
      id: "health_potion",
      name: "Health Potion",
      texture: "potions",
      frame: 0,
    },
    ingredients: [
      { id: "green_flower", amount: 1 },
      { id: "emerald_ore", amount: 1 },
    ],
  },

  {
    result: {
      id: "mana_potion",
      name: "Mana Potion",
      texture: "potions",
      frame: 1,
    },
    ingredients: [
      { id: "violet_flower", amount: 1 },
      { id: "amethyst_ore", amount: 1 },
    ],
  },

  {
    result: {
      id: "damage_potion",
      name: "Damage Potion",
      texture: "potions",
      frame: 2,
    },
    ingredients: [
      { id: "gold_ore", amount: 1 },
      { id: "red_flower", amount: 1 },
    ],
  },
];