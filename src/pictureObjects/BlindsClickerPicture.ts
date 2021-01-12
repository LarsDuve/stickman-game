/// <reference path="../gameObjects.ts"/>
class blindsClickerPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("./assets/pictures/BlindsClickerPicture.png", xPos, yPos,"blindsClickerPicture");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
        
        }



}