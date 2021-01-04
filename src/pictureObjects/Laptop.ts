/// <reference path="../gameObjects.ts"/>
class Laptop extends GameObjects {
  

    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("./assets/pictures/laptopPrivacy.png", xPos, yPos,"Laptop");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
        
        }



}