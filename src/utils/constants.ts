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
}

export const MAGIC_PROPERTIES = {
    BOLT:{
        radius: 6,
        offsetX: 14,
        offsetY: 10,
        scaleRate: 1,
        lifetime: 2500,
    },

    AOE:{
        radius: 10,
        offsetX: 6,
        offsetY: 12,
        scaleRate: 1.5,
        lifetime: 1000,
    },

    AURA:{
        radius: 14,
        offsetX: 2,
        offsetY: 2,
        scaleRate: 2,
        lifetime: 10000,
    },
}