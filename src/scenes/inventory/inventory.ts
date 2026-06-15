import { SPRITES } from "../../utils/constants";

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
}