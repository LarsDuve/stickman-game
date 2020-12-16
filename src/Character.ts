/// <reference path="GameObjects.ts" />

class Character extends GameObjects {

    constructor(xPos: number, yPos: number){
        super(`character`, `./assets/img/character.png`, xPos, yPos);
    }
}