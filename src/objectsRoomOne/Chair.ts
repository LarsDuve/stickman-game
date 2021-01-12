/// <reference path=".././GameObject.ts" />

class Chair extends GameObject {
    private static readonly NAME = "chair";
    private static readonly SOURCE = "./assets/imgRoomOne/chair.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(Chair.NAME, 390, 350, canvas, Chair.SOURCE);
    }
}