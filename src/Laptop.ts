/// <reference path="GameObject.ts" />

class Laptop extends GameObject {
    private static readonly NAME = "laptop";
    private static readonly SOURCE = "./assets/img/laptop.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(Laptop.NAME, 650, 280, canvas, Laptop.SOURCE);
    }
}