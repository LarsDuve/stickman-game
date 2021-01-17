/// <reference path="../GameObjects.ts" />

class Plant extends GameObjects {

    constructor (xPos: number, yPos: number){
        super("plant", "./assets/imgPassword/plant.png", xPos, yPos);
        }

    public move(canvas: HTMLCanvasElement) {
        this.setXPos(this.getXPos() - 85);
    }

}