import Phaser from "phaser"
import "./style.css"
import { scenes } from "./scenes"


new Phaser.Game({
  width: 1280,
  height: 720,
  title: "Arcane Reborn",
  scene: scenes,
  url: import.meta.env.BASE_URL || "",
  version: import.meta.env.VERSION || "0.0.1",
  backgroundColor: "#000",
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixelArt: true,
  render:{
    roundPixels:true
  }
  

})
