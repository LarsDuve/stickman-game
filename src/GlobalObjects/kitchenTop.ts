/// <reference path="../gameObjects.ts"/>
class kitchenTop extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("kitchenTopPicture","./assets/img/KitchenTop.png", xPos, yPos);
        thisWidth = this.image.width;
        thisHeight = this.image.height;
        }

}