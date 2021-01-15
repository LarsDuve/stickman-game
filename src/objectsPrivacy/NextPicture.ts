/// <reference path="../gameObjects.ts"/>
class nextPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("nextPicture","./assets/imgPrivacy/Next.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth =  this.getImageHeight();
        
        }



}