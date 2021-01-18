/// <reference path="../gameObjects.ts"/>
class CreepyManStanding extends GameObjects {
    
    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("creepyManStanding","./assets/imgPrivacy/creepyManStanding.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        
        }



}