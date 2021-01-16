/// <reference path="../gameObjects.ts"/>
class houseLevelSelector extends GameObjects {
  


    constructor (xPos: number, yPos: number, thisWidth:number, thisHeight:number){
        super("houseLevelSelector","./assets/img/house-top-down-view.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
        }



}