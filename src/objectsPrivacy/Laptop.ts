/// <reference path="../gameObjects.ts"/>
class Laptop extends GameObjects {
  

    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("Laptop","./assets/imgPrivacy/laptopPrivacy.png", xPos, yPos);
        thisHeight = this.getImageHeight();
         thisWidth =  this.getImageHeight();
        }



}