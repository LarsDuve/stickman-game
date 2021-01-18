/// <reference path="../gameObjects.ts"/>
class LaptopScreenPrivacy extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("privacyLaptopScreen","./assets/imgPrivacy/laptopScreen.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        
        }



}