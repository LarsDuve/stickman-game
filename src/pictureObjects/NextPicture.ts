/// <reference path="../gameObjects.ts"/>
class nextPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("./assets/pictures/Next.png", xPos, yPos,"nextPicture");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
        
        }



}