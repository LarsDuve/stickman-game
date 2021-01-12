/// <reference path="../gameObjects.ts"/>
class personBirthday extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("./assets/pictures/personBirthday.png", xPos, yPos,"personBirthday");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
        
        }



}