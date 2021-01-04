/// <reference path="../gameObjects.ts"/>
class houseNumber extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("./assets/pictures/houseNumber.png", xPos, yPos,"houseNumber");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
        
        }



}