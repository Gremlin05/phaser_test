import type { Inventory } from "./inventory";

export type Recipe = {
  id: string;
  result: {
    id: string;
    name: string;
    texture: string;
    frame: number;
  };
  ingredients: {
    id: string;
    amount: number;
  }[];
};

export class CraftSystem {
  static craft(inventory: Inventory, recipe: Recipe): boolean {
    // 1. проверка ресурсов
    const canCraft = recipe.ingredients.every((ing) =>
      inventory.hasItem(ing.id, ing.amount)
    );

    if (!canCraft) {
      console.log("❌ Not enough resources for:", recipe.id);
      return false;
    }

    // 2. списываем ресурсы
    recipe.ingredients.forEach((ing) => {
      inventory.removeItem(ing.id, ing.amount);
    });

    // 3. выдаём результат
    inventory.addItem(
      recipe.result.id,
      recipe.result.name,
      1,
      99,
      recipe.result.texture,
      recipe.result.frame
    );

    console.log("✅ Crafted:", recipe.result.name);
    return true;
  }
}