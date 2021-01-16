/// <reference path="../gameObjects.ts"/>
class garageTop extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("garageTopPicture","./assets/img/GarageTop.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        }



}