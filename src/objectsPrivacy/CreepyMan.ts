/// <reference path="../gameObjects.ts"/>
class CreepyMan extends GameObjects {
    
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("CreepyMan","./assets/imgPrivacy/creepyMan.png", xPos, yPos);
        thisHeight = this.getImageHeight();
         thisWidth =  this.getImageHeight();
        
        }



}