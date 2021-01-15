/// <reference path="../gameObjects.ts"/>
class personID extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("personID","./assets/imgPrivacy/personID.png", xPos, yPos);
        thisHeight = this.getImageHeight();
         thisWidth =  this.getImageHeight();
        
        }



}