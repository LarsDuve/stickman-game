/// <reference path="../gameObjects.ts"/>
class blindsUpPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("./assets/pictures/BlindsUpPicture.png", xPos, yPos,"blindsUpPicture");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
        
        }



}