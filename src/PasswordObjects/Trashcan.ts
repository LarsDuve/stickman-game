/// <reference path="../GameObjects.ts" />

class Trashcan extends GameObjects {

    constructor (xPos: number, yPos: number){
        super("trashcan", "./assets/imgPassword/trashcan.png", xPos, yPos);        
        }


    public move(canvas: HTMLCanvasElement) {
        this.setXPos(this.getXPos() + 85);
    }

}