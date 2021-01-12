/// <reference path="../gameObjects.ts"/>
class uploadPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("./assets/pictures/Upload.png", xPos, yPos,"uploadPicture");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
        
        }



}