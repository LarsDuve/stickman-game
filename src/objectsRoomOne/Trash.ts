/// <reference path=".././GameObject.ts" />

class Trash extends GameObject {
    private static readonly NAME = "trash";
    private static readonly SOURCE = "./assets/imgRoomOne/trash.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(Trash.NAME, 808 ,550, canvas, Trash.SOURCE);
    }
}