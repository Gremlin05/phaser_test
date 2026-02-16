import Phaser from "phaser"
//import forestJSON from "../src/assets/tiles/forest.json"
//import {SIZE} from "../src/utils/constants.ts"
import "./style.css"
import { scenes } from "./scenes/indesx"


new Phaser.Game({
  width: 1280, //forestJSON.width * SIZE.TILE,
  height: 720, //forestJSON.height * SIZE.TILE,
  title: "Превед Медвед!",
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
