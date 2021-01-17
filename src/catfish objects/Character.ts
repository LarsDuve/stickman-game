/// <reference path="../GameObjects.ts" />

class CharacterCatfish extends GameObjects {

    constructor(xPos: number, yPos: number){
        super(`character`, `./assets/imgCatfish/character.png`, xPos, yPos);
    }
}
