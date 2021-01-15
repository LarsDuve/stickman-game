/// <reference path="../gameObjects.ts"/>
class blindsClickerPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("blindsClickerPicture","./assets/imgPrivacy/BlindsClickerPicture.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth =  this.getImageHeight();
        }



}