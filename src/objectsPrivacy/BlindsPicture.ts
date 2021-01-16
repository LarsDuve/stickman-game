/// <reference path="../gameObjects.ts"/>
class blindsPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("blindsPicture","./assets/imgPrivacy/BlindsPicture.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        }



}