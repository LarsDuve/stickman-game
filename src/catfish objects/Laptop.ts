/// <reference path="../GameObjects.ts" />

class Laptop extends GameObjects {

    constructor(xPos: number, yPos: number){
        super(`laptop`, `./assets/img/laptop-resize.png`, xPos, yPos);
    }
}