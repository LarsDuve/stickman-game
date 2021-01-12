/// <reference path="GameObjects.ts" />

class LightSwitch extends GameObjects {

    constructor(xPos: number, yPos: number){
        super(`lightswitch`, `./assets/img/lightSwitchTransparent.png`, xPos, yPos);
    }
}