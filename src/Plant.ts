/// <reference path="GameObject.ts" />

class Plant extends GameObject {
    private static readonly NAME = "plant";
    private static readonly SOURCE = "./assets/img/plant.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(Plant.NAME, 1220, 340, canvas, Plant.SOURCE);
    }

    public move(canvas: HTMLCanvasElement) {
        this.setXPos(this.getXPos() - 85);
    }

}