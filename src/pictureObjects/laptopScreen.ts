/// <reference path="../gameObjects.ts"/>
class LaptopScreen extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("./assets/pictures/laptopScreen.png", xPos, yPos,"laptopScreen");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
        
        }



}