/// <reference path="../gameObjects.ts"/>
class uploadPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("uploadPicture","./assets/imgPrivacy/Upload.png", xPos, yPos);
        thisHeight = this.getImageHeight();
         thisWidth =  this.getImageHeight();
        
        }



}