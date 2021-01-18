/// <reference path="../gameObjects.ts"/>
class blindsPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("blindsPicture","./assets/imgPrivacy/blindsPicture.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        }



}