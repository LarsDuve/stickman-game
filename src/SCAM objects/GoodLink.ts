/// <reference path="../gameObjects.ts"/>

class GoodLink extends GameObjects {

    private xVelocity: number;
    private yVelocity: number;

    constructor(xPos: number, yPos: number, link: number){
        super(`goodlink`, `./assets/imgSCAM/good${link}.png`, xPos, yPos);
        this.xVelocity = GameMaster.randomNumber(-3, 3);
        this.yVelocity = GameMaster.randomNumber(-3, 3);
    }

    public moveLinks(canvas: HTMLCanvasElement) {
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