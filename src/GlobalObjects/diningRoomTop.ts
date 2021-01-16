/// <reference path="../gameObjects.ts"/>
class DiningRoomTop extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("diningRoomTopPicture","./assets/img/DiningRoomTop.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        }



}