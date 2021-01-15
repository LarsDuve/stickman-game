/// <reference path="../gameObjects.ts"/>

class BadLink extends GameObjects {

    private xVelocity: number;
    private yVelocity: number;

    constructor(xPos: number, yPos: number, link: number){
        super(`badlink`, `./assets/img/bad${link}.png`, xPos, yPos);
        this.xVelocity = GameMaster.randomNumber(-5, 5);
        this.yVelocity = GameMaster.randomNumber(-5, 5);
    }

    public move(canvas: HTMLCanvasElement) {
        this.xPos += this.xVelocity;
        this.yPos += this.yVelocity;

        if(this.xPos <= 0 || this.xPos + this.getImageWidth() >= canvas.width) {
            this.xVelocity = -this.xVelocity;
        }
        if(this.yPos <= 0 || this.yPos + this.getImageHeight() >= canvas.height){
            this.yVelocity = -this.yVelocity;
        }
    }
}