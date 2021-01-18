/// <reference path="../gameObjects.ts"/>
class privacyDoor extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("privacyDoor","./assets/imgPrivacy/privacyDoor.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        
        }



}