/// <reference path="../gameObjects.ts"/>
class personalMistake extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("personalMistake","./assets/imgPrivacy/personalMistake.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        
        }



}