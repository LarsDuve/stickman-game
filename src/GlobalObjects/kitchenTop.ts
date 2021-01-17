/// <reference path="../gameObjects.ts"/>
class kitchenTop extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("kitchenTopPicture","./assets/img/KitchenTop.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        }

}