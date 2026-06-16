import { SPRITES } from "../../utils/constants";
import { CRAFT_RECIPES } from "./crafting";

export type ItemId = string;

export interface InventoryItem {
    id: ItemId;
    name: string;
    amount: number;
    maxStack: number;
    texture: string;
    frame: number;
}



export class Inventory {
  private items: Map<ItemId, InventoryItem> = new Map();

  private size: number;
  constructor(size: number = 20) {
    this.size = size
  }

  addItem(id: ItemId, name: string, amount = 1, maxStack = 99, texture: string, frame: number) {
    const existing = this.items.get(id);

    if (existing) {
      existing.amount += amount;
      this.items.set(id, existing);
      return;
    }

    if (this.items.size >= this.size) {
      console.log("Inventory full!");
      return;
    }

    this.items.set(id, {
      id,
      name,
      amount,
      maxStack,
      texture,
      frame,
    });
  }

  removeItem(id: ItemId, amount = 1) {
    const item = this.items.get(id);
    if (!item) return;

    item.amount -= amount;

    if (item.amount <= 0) {
      this.items.delete(id);
    } else {
      this.items.set(id, item);
    }
  }

  getItems() {
    return Array.from(this.items.values());
  }

  hasItem(id: ItemId, amount = 1): boolean {
    const item = this.items.get(id);
    return !!item && item.amount >= amount;
  }

craft(resultId: string): boolean {
  const recipe = CRAFT_RECIPES.find(r => r.result.id === resultId);
  if (!recipe) return false;

  // проверка ресурсов
  const canCraft = recipe.ingredients.every(i =>
    this.hasItem(i.id, i.amount)
  );

  if (!canCraft) return false;

  // списываем ресурсы
  recipe.ingredients.forEach(i => {
    this.removeItem(i.id, i.amount);
  });

  // добавляем предмет
  const r = recipe.result;

  this.addItem(
    r.id,
    r.name,
    1,
    99,
    r.texture,
    r.frame
  );

  return true;
}

}