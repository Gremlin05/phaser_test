import type { Player } from "../player";
import { Enemy } from "./enemy";
import { ENEMY_STATES } from "../../utils/constants";
import { ENEMIES_PROPERTIES } from "../../utils/constants";

export class EnergySphere extends Enemy {
  private distance: number;

  private attackCooldown: boolean = false;
  private attackDelay: number = 1000;
  private attackRange: number = 32;
  private powerMultiplier: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    type: string,
    target: Player,
    powerMultiplier: number
  ) {
    super(scene, x, y, texture, type, target);
    this.play("energy_sphere", true)
    this.powerMultiplier = powerMultiplier;
    this.setScale(powerMultiplier);

    this.hp = ENEMIES_PROPERTIES.ENERGY_SPHERE.hp * powerMultiplier;
    this.damage = ENEMIES_PROPERTIES.ENERGY_SPHERE.damage * powerMultiplier;
    this.speed = ENEMIES_PROPERTIES.ENERGY_SPHERE.speed;
    this.distanceForAgro = ENEMIES_PROPERTIES.ENERGY_SPHERE.distanceForAgro;

    this.maxHp = this.hp;

    this.enemyState = ENEMY_STATES.CHASE;
  }

  checkDistance(): void {
    this.distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y,
    );
  }

  chase(distance: number): void {
    if (distance <= this.distanceForAgro) {
      this.scene.physics.moveToObject(
        this,
        this.target,
        this.speed,
      );
    } else {
      this.body.stop();
    }
  }

  attack(): void {
    if (this.attackCooldown) return;

    this.attackCooldown = true;

    if (this.distance <= this.attackRange) {
      this.target.takeDamage(this.damage);
    }

    
    this.scene.tweens.add({
      targets: this,
      scaleX: this.scaleX * 1.2,
      scaleY: this.scaleY * 1.2,
      duration: 100,
      yoyo: true,
    });

    this.scene.time.delayedCall(this.attackDelay, () => {
      this.attackCooldown = false;
    });
  }

  patrolling(): void {
    
  }

  changeState(state: string): void {
    this.enemyState = state;
  }

  die(): void {
  if (this.powerMultiplier > 0.25) {
    const childMultiplier = this.powerMultiplier / 2;

    const sphere1 = new EnergySphere(
      this.scene,
      this.x - 16,
      this.y,
      this.textureKey,
      this.enemyType,
      this.target,
      childMultiplier,
    );

    const sphere2 = new EnergySphere(
      this.scene,
      this.x + 16,
      this.y,
      this.textureKey,
      this.enemyType,
      this.target,
      childMultiplier,
    );

    this.scene.add.existing(sphere1);
    this.scene.add.existing(sphere2);

    this.scene.physics.add.existing(sphere1);
    this.scene.physics.add.existing(sphere2);

    (this.scene as any).enemyGroup.add(sphere1);
    (this.scene as any).enemyGroup.add(sphere2);
  }

  super.die();
}

  update(): void {
    
    if (this.hp <= 0) return;

    this.checkDistance();

    switch (this.enemyState) {
      case ENEMY_STATES.CHASE:
        this.chase(this.distance);

        if (this.distance <= this.attackRange) {
          this.body.stop();
          this.attack();
        }
        break;
    }
  }
}