/// <reference path="../gameObjects.ts"/>
class backPicture extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("./assets/pictures/Back.png", xPos, yPos,"backPicture");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
        
        }



}