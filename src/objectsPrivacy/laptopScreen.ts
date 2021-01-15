/// <reference path="../gameObjects.ts"/>
class LaptopScreenPrivacy extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("laptopScreen","./assets/imgPrivacy/laptopScreen.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth =  this.getImageHeight();
        
        }



}