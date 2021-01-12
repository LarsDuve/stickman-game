/// <reference path="../gameObjects.ts"/>
class personID extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("./assets/pictures/personID.png", xPos, yPos,"personID");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
        
        }



}