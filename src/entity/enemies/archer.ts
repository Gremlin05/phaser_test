import { Enemy } from "./enemy";
import { Player } from "../player";
import {
  ENEMIES_PROPERTIES,
  ENEMY_STATES,
  SPRITES,
  WEAPON_PROPERTIES,
} from "../../utils/constants";
import { Weapon } from "../weapon";
import { Arrow } from "../arrow";
import { keepDistanceAction } from "../../utils/ai";
import { projectileVelocity } from "../../utils/math";

export class Archer extends Enemy {
  private distance: number = 0;

  private attackCooldown: boolean = false;
  private attackDelay: number = ENEMIES_PROPERTIES.ARCHER.attackDelay;

  private idealDistance: number =
    ENEMIES_PROPERTIES.ARCHER.distanceForKeepDistance;

  private distanceTolerance: number = 30;

  private minDistance: number = this.idealDistance - this.distanceTolerance;
  private maxDistance: number = this.idealDistance + this.distanceTolerance;

  private currentAnim: string = "";

  private lastX: number;
  private lastY: number;

  private enemyProjectilesGroup: Phaser.Physics.Arcade.Group

  private bow: Weapon;
  private arrowSpeed: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    type: string,
    target: Player,
    enemyProjectilesGroup: Phaser.Physics.Arcade.Group
    
  ) {
    super(scene, x, y, texture, type, target);

    this.hp = ENEMIES_PROPERTIES.ARCHER.hp;
    this.damage = ENEMIES_PROPERTIES.ARCHER.damage;
    this.speed = ENEMIES_PROPERTIES.ARCHER.speed;
    this.distanceForAgro = ENEMIES_PROPERTIES.ARCHER.distanceForAgro;

    this.enemyState = ENEMY_STATES.IDLE;

    this.spawnX = x;
    this.spawnY = y;

    this.enemyProjectilesGroup = enemyProjectilesGroup
    this.arrowSpeed = WEAPON_PROPERTIES.ARROW.speed
    
    this.lastX = x;
    this.lastY = y;

    this.bow = new Weapon(scene, x, y, SPRITES.WEAPONS.BOW, 1);
  }

  patrolling(): void {}

  private getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
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
      this.safePlay("archer_idle");
    } else {
      if (Math.abs(dx) > Math.abs(dy)) {
        this.bow.setFlipX(false)
        this.safePlay(dx > 0 ? "archer_right" : "archer_left");
      } else {
        this.bow.setFlipX(true)
        this.safePlay(dy > 0 ? "archer_down" : "archer_up");
      }
    }

    this.lastX = this.x;
    this.lastY = this.y;
  }

  checkDistance(): void {
    this.distance = Phaser.Math.Distance.BetweenPoints(this, this.target);
  }

  chase(): void {
    this.scene.physics.moveToObject(this, this.target, this.speed);
  }

  private keepDistance(): void {
    const body = this.getBody();

    const action = keepDistanceAction(this.distance, this.minDistance, this.maxDistance);

    if (action === "retreat") {
      const angle = Phaser.Math.Angle.Between(
        this.target.x,
        this.target.y,
        this.x,
        this.y,
      );

      body.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed);
      return;
    }

    if (action === "approach") {
      this.chase();
      return;
    }

    body.setVelocity(0, 0);
    this.attack();
  }

  private returnToSpawn(): void {
    this.scene.physics.moveTo(this, this.spawnX, this.spawnY);

    if (
      Phaser.Math.Distance.Between(this.x, this.y, this.spawnX, this.spawnY) < 5
    ) {
      this.changeState(ENEMY_STATES.IDLE);
    }
  }

  attack(): void {
    if (this.attackCooldown) return;

    this.attackCooldown = true;

    this.scene.time.delayedCall(this.attackDelay, () => {
      this.attackCooldown = false;
    });

    const arrow = new Arrow(this.scene, this.x, this.y, SPRITES.WEAPONS.ARRROW)
    this.enemyProjectilesGroup.add(arrow)

    const { vx, vy, angle } = projectileVelocity(
      arrow.x,
      arrow.y,
      this.target.x,
      this.target.y,
      this.arrowSpeed,
    );

    arrow.rotation = angle;
    const arrowBody = arrow.body as Phaser.Physics.Arcade.Body;

    arrowBody.setVelocity(vx, vy)
    
  }

  changeState(state: (typeof ENEMY_STATES)[keyof typeof ENEMY_STATES]): void {
    if (this.enemyState === state) return;
    this.enemyState = state;
  }

  update(): void {
    if (this.hp <= 0) return;

    this.checkDistance();

    if (this.distance > this.distanceForAgro) {
      this.changeState(ENEMY_STATES.RETURN);
    } else {
      this.changeState(ENEMY_STATES.KEEP_DISTANCE);
    }

    switch (this.enemyState) {
      case ENEMY_STATES.IDLE:
        this.getBody().setVelocity(0, 0);
        break;

      case ENEMY_STATES.KEEP_DISTANCE:
        this.keepDistance();
        break;

      case ENEMY_STATES.RETURN:
        this.returnToSpawn();
        break;
    }

    const offsetX = this.bow.flipX ? -10 : 10;

    this.bow.setPosition(this.x + offsetX, this.y);
    this.bow.setFlipX(this.bow.flipX);

    this.playMoveAnimation();
  }

  die(): void {
    if (this.bow && this.bow.active) {
      this.bow.destroy();
    }
    super.die();
  }
}
