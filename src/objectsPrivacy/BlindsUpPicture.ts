/// <reference path="../gameObjects.ts"/>
class blindsUpPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("blindsUpPicture","./assets/imgPrivacy/BlindsUpPicture.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        }



}