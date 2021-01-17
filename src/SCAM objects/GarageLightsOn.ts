/// <reference path="../gameObjects.ts"/>
class GarageLightsOn extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("garagelightson","./assets/imgSCAM/garageLightsOn.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        
        }



}