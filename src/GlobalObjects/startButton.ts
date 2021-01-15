/// <reference path="../gameObjects.ts"/>
class startButton extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("blindsClickerPicture","./assets/imgPrivacy/start-button.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth =  this.getImageHeight();
        }



}