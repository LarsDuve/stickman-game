/// <reference path="../gameObjects.ts"/>
class GarageLightsOff extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("garagelightsoff","./assets/imgSCAM/garageLightsOut.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        
        }



}