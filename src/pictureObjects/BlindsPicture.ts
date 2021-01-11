/// <reference path="../gameObjects.ts"/>
class blindsPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("./assets/pictures/BlindsPicture.png", xPos, yPos,"blindsPicture");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
        
        }



}