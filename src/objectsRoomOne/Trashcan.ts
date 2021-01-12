/// <reference path=".././GameObject.ts" />

class Trashcan extends GameObject {
    private static readonly NAME = "trashcan";
    private static readonly SOURCE = "./assets/imgRoomOne/trashcan.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(Trashcan.NAME, 780 ,500, canvas, Trashcan.SOURCE);
    }

    public move(canvas: HTMLCanvasElement) {
        this.setXPos(this.getXPos() + 85);
    }

}