/// <reference path="../gameObjects.ts"/>
class houseNumber extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("houseNumber","./assets/imgPrivacy/houseNumber.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        }



}