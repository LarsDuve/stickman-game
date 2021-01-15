/// <reference path="../gameObjects.ts"/>
class startScreen extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("blindsClickerPicture","./assets/imgPrivacy/start-scene.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth =  this.getImageHeight();
        }



}