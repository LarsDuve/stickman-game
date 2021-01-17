/// <reference path="../gameObjects.ts"/>
class Arrow extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("arrow","./assets/img/arrow.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        
        }



}