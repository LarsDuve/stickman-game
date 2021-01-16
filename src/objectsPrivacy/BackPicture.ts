/// <reference path="../gameObjects.ts"/>
class backPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("backPicture","./assets/imgPrivacy/Back.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        
        }



}