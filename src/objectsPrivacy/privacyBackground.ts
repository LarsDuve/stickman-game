/// <reference path="../gameObjects.ts"/>
class privacyBackground extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("backgroundPrivacy","./assets/imgPrivacy/backgroundPrivacy.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        
        }



}