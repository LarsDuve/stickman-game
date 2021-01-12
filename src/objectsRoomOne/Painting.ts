/// <reference path=".././GameObject.ts" />

class Painting extends GameObject {
    private static readonly NAME = "painting";
    private static readonly SOURCE = "./assets/imgRoomOne/painting.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(Painting.NAME, 360, 65, canvas, Painting.SOURCE);
    }

    public move(canvas: HTMLCanvasElement) {
        this.setXPos(this.getXPos() + 85);
    }

}