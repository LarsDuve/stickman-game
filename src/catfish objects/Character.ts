/// <reference path="../GameObjects.ts" />

class CharacterCatfish extends GameObjects {

    constructor(xPos: number, yPos: number){
        super(`character`, `./assets/img/character.png`, xPos, yPos);
    }
}
