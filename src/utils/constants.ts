export const TILES = {
    FOREST: "forest",
}

export const SIZE = {
    TILE: 32,
}

export const LAYERS = {
    GROUND: "ground",
    WALLS: "walls"
}

export const SKILL_TREE_TEXT = {
    HP: "+1 к реген хп",
    MANA: "+1 к реген маны",
    SPELL_DAMAGE: "+1 урон от заклинаний"

}

export const SPRITES = {
    PLAYER: "Player",
    MAGIC: "Magic",
    POINTER: "Pointer",
    ENEMIES:{
        SWORDMAN: "Swordman",
        ARCHER: "Archer",
        ENERGY_SPHERE: "Energy_Sphere",
        ENERGY_SPAWNER: "Energy_Spawner"
    },
    WEAPONS:{
        SWORD: "Sword",
        BOW: "Bow",
        ARRROW: "Arrow"
    },
    HEADS: {
        PLAYER_HEAD: "PlayerHead",
        SWORDMAN_HEAD: "SwordmanHead",
        ARCHER_HEAD: "ArcherHead",
        HEAD_FRAME: "HeadFrame"
    },
    BUILDINGS: {
        ARCANE_GATES: "ArcaneGates",
        ARCANE_GATES_COLUMN: "ArcaneGatesColumn",
        ARCANE_TOWER: "ArcaneTower",
        FIRE_TOWER: "FireTower",
        BUTTON: "Button",
        PORTAL: "Portal",
        CRAFT_TABLE: "CraftTable",
    },

    SKILL_ICONS: {
        AURA: "Aura",
        AOE: "AOE",
        BOLT: "Bolt",
    },

    SKILL_KEYS: {
        ONE: "ONE",
        TWO: "TWO",
        THREE: "THREE"
    },

    SKILL_TREE: {
        SKILLS:{
            hp: "HP",
            mana: "MANA",
            spellDamage: "SPELL_DAMAGE"
        },

        SKILL_TREE_CONTAINER: "SKILL_TREE_CONTAINER"
    },

    EXP_SPHERE: "EXP_SPHERE",

    UI: {
        PLAY_BUTTON: "PLAY_BUTTON",
        BACKGROUND: "BACKGROUND",
    },

    INTERACTABLES : {
        GOLD_ORE: "GOLD_ORE",
        AMETHYST_ORE: "AMETHYST_ORE",
        EMERALD_ORE: "EMERALD_ORE",
        GREEN_FLOWER: "GREEN_FLOWER",
        RED_FLOWER: "RED_FLOWER",
        VIOLET_FLOWER: "VIOLET_FLOWER",
        CHEST: "CHEST",
        EXTRACT_EFFECT: "EXTRACT_EFFECT",
        HOVER_EFFECT: "HOVER_EFFECT",
        INTERACT_ICON: "INTERCAT_ICON",
        MATERIALS_ICONS: "MATERIALS_ICON",
        POTIONS: "POTIONS"
        
    }

    
}

export const PLAYER_PROPERTIES = {
    HP: 200,
    MANA: 200,
    HP_REGEN_RATE: 5,
    MANA_REGEN_RATE: 15,    
    MAX_EXP: 9
}

export const ENEMIES_PROPERTIES = {
    SWORDMAN: {
        hp: 200,
        damage: 50,
        speed: 50,
        distanceForAgro: 150,
        xp: 0.2
    },

    ARCHER: {
        hp: 100,
        damage: 25,
        speed: 100,
        distanceForAgro: 300,
        distanceForKeepDistance: 200,
        attackDelay: 2000,
        xp: 0.4
    },

    ENERGY_SPHERE:
    {
        hp: 160,
        damage: 64,
        speed: 65,
        attackDelay: 400,
        distanceForAgro: 100 
    },

    ENERGY_SPAWNER:
    {
        hp: 350,
        attackDelay: 1000
    }

}

export const BUILDING_PROPERTIES = {
    ARCANE_TOWER: {
        distanceOffMana: 250
    },
    
    FIRE_TOWER: {
        distanceDealContinuousDamage: 150,
        attackDelay: 200
    }
}

export const ENEMY_STATES ={
    IDLE: "idle",
    PATROL: "patrol",
    CHASE: "chase",
    ATTACK: "attack",
    RETURN: "return",
    KEEP_DISTANCE:"keep_distance"
} as const

export const UI_PROPERTIES = {
    HP_UI: {
        x: 24,
        y: 190,
        text: "HP",
        width: 200,
        height: 24,
    },

    MANA_UI: {
        x: 24,
        y: 240,
        text: "MANA",
        width: 200,
        height: 24,
    },
    
    FONT_SIZE: "24px",

    COLORS:{
        hpBackground: 0xff0000,
        hpText:  "#400404",
        manaBackground: 0x0befff,
        manaText: "#0606f2"
    }
}

export const MAGIC_PROPERTIES = {
    BOLT:{
        radius: 6,
        offsetX: 14,
        offsetY: 10,
        scaleRate: 1,
        lifetime: 2500,
        speed: 100,
        cost: 20,
        damage: 10
    },

    AOE:{
        radius: 12,
        offsetX: 6,
        offsetY: 12,
        scaleRate: 1.5,
        lifetime: 1000,
        cost: 50,
        damage: 25
    },

    AURA:{
        radius: 14,
        offsetX: 2,
        offsetY: 2,
        scaleRate: 2,
        lifetime: 10000,
        cost: 65,
        damage: 0.5
    }
}

export const WEAPON_PROPERTIES = {
    SWORD:{
        damage: 50,
    },

    BOW:{
        damage: 20,
    },

    ARROW: {
        speed: 200
    }

}

export const INTERACTABLES_PROPRETIES = {
    DISTANCE_FOR_INTERACT: 40,
}