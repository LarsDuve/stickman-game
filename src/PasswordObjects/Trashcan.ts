/// <reference path="../gameObjects.ts" />

class Trashcan extends GameObjects {

    constructor (xPos: number, yPos: number){
        super("trashcan", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);        
        }


    public move(canvas: HTMLCanvasElement) {
        this.setXPos(this.getXPos() + 85);
    }

}