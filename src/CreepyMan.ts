/// <reference path="gameObjects.ts"/>
class CreepyMan extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("./assets/pictures/creepyMan.png", xPos, yPos,"CreepyMan");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
        
        }



}