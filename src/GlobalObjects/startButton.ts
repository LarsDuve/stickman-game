/// <reference path="../gameObjects.ts"/>
class startButton extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("startButton","./assets/img/start-button.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        }



}