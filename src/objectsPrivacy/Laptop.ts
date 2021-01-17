/// <reference path="../gameObjects.ts"/>
class Laptop extends GameObjects {
  

    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("Laptop","./assets/imgPrivacy/laptopPrivacy.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        }



}