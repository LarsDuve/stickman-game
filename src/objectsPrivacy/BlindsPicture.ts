/// <reference path="../gameObjects.ts"/>
class blindsPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("blindsPicture","./assets/imgPrivacy/BlindsPicture.png", xPos, yPos);
         thisHeight = this.getImageHeight();
         thisWidth =  this.getImageHeight();
        
        }



}