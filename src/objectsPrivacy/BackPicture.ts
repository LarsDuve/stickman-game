/// <reference path="../gameObjects.ts"/>
class backPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("backPicture","./assets/imgPrivacy/Back.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth =  this.getImageHeight();
        
        }



}