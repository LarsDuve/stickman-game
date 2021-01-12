/// <reference path="GameObjects.ts" />

class Laptop extends GameObjects {

    constructor(xPos: number, yPos: number){
        super(`laptop`, `./assets/img/laptop-color.png`, xPos, yPos);
    }
}