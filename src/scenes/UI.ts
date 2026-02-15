import { UI_PROPERTIES } from "../utils/constants";

export class UI extends Phaser.Scene{

    private hpWidth;
    private manaWidth;

    private hpBar: Phaser.GameObjects.Text;
    private manaBar: Phaser.GameObjects.Text;

    

    constructor()
    {
        super("UI");
        this.hpWidth = UI_PROPERTIES.HP_UI.width
        this.manaWidth = UI_PROPERTIES.MANA_UI.width
        
    }

    create()
    {
        const gameScene = this.scene.get("ForestScene")

        this.hpBar = this.add.text(UI_PROPERTIES.HP_UI.x, UI_PROPERTIES.HP_UI.y, UI_PROPERTIES.HP_UI.text,{
            backgroundColor: UI_PROPERTIES.COLORS.hpBackground,
            color: UI_PROPERTIES.COLORS.hpText,
            fontSize: UI_PROPERTIES.FONT_SIZE,
            fixedWidth: this.hpWidth
        })

        this.manaBar = this.add.text(UI_PROPERTIES.MANA_UI.x, UI_PROPERTIES.MANA_UI.y, UI_PROPERTIES.MANA_UI.text,{
            backgroundColor: UI_PROPERTIES.COLORS.manaBackground,
            color: UI_PROPERTIES.COLORS.manaText,
            fontSize: UI_PROPERTIES.FONT_SIZE,
            fixedWidth: this.manaWidth,
            
        })

        gameScene.events.on("player:manaChanged", (mana: number) =>{
            this.manaWidth = Phaser.Math.Clamp(mana, 0, UI_PROPERTIES.MANA_UI.width);
            this.manaBar.setFixedSize(this.manaWidth, UI_PROPERTIES.MANA_UI.height)
        })

        
    }
}