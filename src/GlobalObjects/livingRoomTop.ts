/// <reference path="../gameObjects.ts"/>
class livingRoomTop extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("livingRoomTopPicture","./assets/img/livingRoomTop.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        }



}