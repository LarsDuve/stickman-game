/// <reference path="../gameObjects.ts"/>

class LightSwitch extends GameObjects {

    constructor(xPos: number, yPos: number){
        super(`lightswitch`, `./assets/img/lightSwitchTransparent.png`, xPos, yPos);
    }
}