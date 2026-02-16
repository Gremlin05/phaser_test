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

export const SPRITES = {
    PLAYER: "Player",
    MAGIC: "Magic",
    POINTER: "Pointer",
    ENEMIES:{
        SWORDMAN: "Swordman",
        ARCHER: "Archer",
    }
}

export const PLAYER_PROPERTIES = {
    HP: 200,
    MANA: 200,
    HP_REGEN_RATE: 5,
    MANA_REGEN_RATE: 15    
}

export const ENEMIES_PROPERTIES = {
    SWORDMAN: {
        hp: 200,
        damage: 50,
        speed: 100,
        distanceForAgro: 50
    },

    ARCHER: {
        hp: 100,
        damage: 25,
        speed: 175,
        distanceForAgro: 200
    }

}

export const UI_PROPERTIES = {
    HP_UI: {
        x: 20,
        y: 20,
        text: "HP",
        width: 200,
        height: 20,
    },

    MANA_UI: {
        x: 20,
        y: 50,
        text: "",
        width: 200,
        height: 24,
    },
    
    FONT_SIZE: "24px",

    COLORS:{
        hpBackground: "#ff0000",
        hpText: "#400404",
        manaBackground:"#0befff",
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
        cost: 20
    },

    AOE:{
        radius: 10,
        offsetX: 6,
        offsetY: 12,
        scaleRate: 1.5,
        lifetime: 1000,
        cost: 50
    },

    AURA:{
        radius: 14,
        offsetX: 2,
        offsetY: 2,
        scaleRate: 2,
        lifetime: 10000,
        cost: 65
    },
}