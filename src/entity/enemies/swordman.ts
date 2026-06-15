import { Enemy } from "./enemy";
import { Player } from "../player";
import { ENEMIES_PROPERTIES, SPRITES } from "../../utils/constants";
import { ENEMY_STATES } from "../../utils/constants";
import { Weapon } from "../weapon";

export class Swordman extends Enemy {
  private distance: number;
  private patrolTween: Phaser.Tweens.Tween;
  private isAttacking: boolean = false;
  private sword: Weapon;

  private isPatrolling: boolean;
  private patrollingDirection: boolean;

  private attackCooldown: boolean = false;
  private attackDelay: number = 800;
  private attackRange: number = 50;

  private currentAnim: string = "";

  private lastX: number;
  private lastY: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    type: string,
    target: Player,
    isPatrolling: boolean,
    patrollingDirection: boolean,
  ) {
    super(scene, x, y, texture, type, target);

    this.hp = ENEMIES_PROPERTIES.SWORDMAN.hp;
    this.damage = ENEMIES_PROPERTIES.SWORDMAN.damage;
    this.speed = ENEMIES_PROPERTIES.SWORDMAN.speed;
    this.distanceForAgro = ENEMIES_PROPERTIES.SWORDMAN.distanceForAgro;

    this.enemyState = ENEMY_STATES.CHASE;

    this.spawnX = x;
    this.spawnY = y;

    this.sword = new Weapon(scene, x, y, SPRITES.WEAPONS.SWORD, 0);

    this.isPatrolling = isPatrolling;
    this.patrollingDirection = patrollingDirection;

    this.lastX = x;
    this.lastY = y;
  }

  private safePlay(key: string): void {
    if (this.currentAnim === key) return;

    this.currentAnim = key;
    this.play(key, true);
  }

  private playMoveAnimation(): void {
    const dx = this.x - this.lastX;
    const dy = this.y - this.lastY;

    const moved = Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5;

    if (!moved) {
      this.safePlay("swordman_idle");
    } else {
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          this.sword.setFlipX(false);
          this.safePlay("swordman_right");
        } else {
          this.sword.setFlipX(true);
          this.safePlay("swordman_left");
        }
      } else {
        if (dy > 0) {
          this.safePlay("swordman_down");
        } else {
          this.safePlay("swordman_up");
        }
      }
    }

    this.lastX = this.x;
    this.lastY = this.y;
  }

  attack(): void {
    if (this.attackCooldown) return;

    this.attackCooldown = true;

    if (
      Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.target.x,
        this.target.y,
      ) <= this.attackRange
    ) {
      this.target.takeDamage(this.damage);
    }

    this.isAttacking = true;

    this.scene.tweens.add({
      targets: this.sword,
      angle: this.flipX ? -60 : 60,
      duration: 120,
      yoyo: true,
      onComplete: () => {
        this.isAttacking = false;
      },
    });

    this.scene.time.delayedCall(this.attackDelay, () => {
      this.attackCooldown = false;
    });
  }

  chase(distance: number): void {
    if (distance <= this.distanceForAgro) {
      this.scene.physics.moveToObject(this, this.target, this.speed);
    }
  }

  patrolling(): void {
    if (this.isPatrolling) {
      if (this.patrolTween) return;

      this.body.stop();

      if (this.patrollingDirection) {
        this.patrolTween = this.scene.tweens.add({
          targets: this,
          x: this.spawnX + 200,
          yoyo: true,
          repeat: -1,
          duration: this.speed * 100,
        });
      } else {
        this.patrolTween = this.scene.tweens.add({
          targets: this,
          y: this.spawnY + 200,
          yoyo: true,
          repeat: -1,
          duration: this.speed * 100,
        });
      }
    } else {
      this.body.stop();
    }
  }

  stopPatrol(): void {
    if (this.patrolTween) {
      this.patrolTween.stop();
      this.patrolTween = undefined;
    }
  }

  checkDistance(): void {
    this.distance = Phaser.Math.Distance.BetweenPoints(this, this.target);
  }

  changeState(state: (typeof ENEMY_STATES)[keyof typeof ENEMY_STATES]): void {
    if (this.enemyState === state) return;

    if (this.enemyState === ENEMY_STATES.PATROL) {
      this.stopPatrol();
    }

    this.enemyState = state;

    if (state === ENEMY_STATES.PATROL) {
      this.patrolling();
    }
  }

  update(): void {
    if (this.hp <= 0) return;

    this.checkDistance();

    switch (this.enemyState) {
      case ENEMY_STATES.IDLE:
        this.body.stop();
        break;

      case ENEMY_STATES.CHASE: {
        this.chase(this.distance);

        if (this.distance <= this.attackRange) {
          this.body.stop();
          this.attack();
        }

        if (this.distance > this.distanceForAgro) {
          this.scene.physics.moveTo(this, this.spawnX, this.spawnY);

          if (
            Phaser.Math.Distance.Between(
              this.x,
              this.y,
              this.spawnX,
              this.spawnY,
            ) < 10
          ) {
            this.changeState(ENEMY_STATES.PATROL);
          }
        }

        break;
      }

      case ENEMY_STATES.PATROL: {
        if (this.distance <= this.distanceForAgro) {
          this.changeState(ENEMY_STATES.CHASE);
        }
        break;
      }
    }

    const offsetX = this.sword.flipX ? -16 : 16;

    this.sword.setPosition(this.x + offsetX, this.y);
    this.sword.setFlipX(this.sword.flipX);
    this.playMoveAnimation();

    if (!this.isAttacking) this.sword.setAngle(this.sword.flipX ? -30 : 30);
  }

  die(): void {
    if (this.sword && this.sword.active) {
      this.sword.destroy();
    }
    super.die();
  }
}
