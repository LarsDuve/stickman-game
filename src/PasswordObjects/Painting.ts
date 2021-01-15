/// <reference path="../gameObjects.ts" />

class Painting extends GameObjects {

    constructor (xPos: number, yPos: number){
        super("painting", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
        }


    public move(canvas: HTMLCanvasElement) {
        this.setXPos(this.getXPos() + 85);
    }

}