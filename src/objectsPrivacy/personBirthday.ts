/// <reference path="../gameObjects.ts"/>
class personBirthday extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("personBirthday","./assets/imgPrivacy/personBirthday.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        
        }



}