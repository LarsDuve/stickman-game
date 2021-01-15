/// <reference path="../gameObjects.ts"/>

class ChugJug extends GameObjects {

    constructor(xPos: number, yPos: number){
        super(`chugjug`, `./assets/img/ChugJug-resize.png`, xPos, yPos);
    }
}