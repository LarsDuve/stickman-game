/// <reference path="../GameObjects.ts" />

class StartKnop extends GameObjects {

    constructor(xPos: number, yPos: number){
        super("start-knop", "./assets/img/start-knop.png", xPos, yPos);
    }
}