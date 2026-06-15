import type { Player } from "../player";
import { Enemy } from "./enemy";
import { EnergySphere } from "./energy_sphere";
import { ENEMY_STATES, SPRITES } from "../../utils/constants";

export class EnergySpawner extends Enemy {
  private distance: number = 0;

  private spawnCooldown: boolean = false;
  private spawnDelay: number = 10000;
  private spawnRange: number = 200;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    type: string,
    target: Player
  ) {
    super(scene, x, y, texture, type, target);
    this.play("energy_spawner", true)

    this.hp = 300;
    this.maxHp = this.hp;

    this.enemyState = ENEMY_STATES.CHASE;
    this.distanceForAgro = this.spawnRange;
  }

  checkDistance(): void {
    this.distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );
  }

  chase(): void {
    
  }

  patrolling(): void {

  }

  changeState(state: string): void {
    this.enemyState = state;
  }

  attack(): void {
    if (this.spawnCooldown) return;

    this.spawnCooldown = true;

    const scene = this.scene as any;

    const sphere = new EnergySphere(
      this.scene,
      this.x,
      this.y,
      SPRITES.ENEMIES.ENERGY_SPAWNER,
      "energy_sphere",
      this.target,
      1
    );

    
    scene.enemyGroup.add(sphere);

    this.scene.time.delayedCall(this.spawnDelay, () => {
      this.spawnCooldown = false;
    });
  }

  update(): void {
    if (this.hp <= 0) return;

    this.checkDistance();

    if (this.distance <= this.spawnRange) {
      this.attack();
    }
  }

  
}