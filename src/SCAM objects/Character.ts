/// <reference path="../gameObjects.ts"/>

class Character extends GameObjects {

    constructor(xPos: number, yPos: number){
        super(`character`, `./assets/imgSCAM/character.png`, xPos, yPos);
    }
}