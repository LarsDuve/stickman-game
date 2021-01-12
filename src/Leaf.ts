/// <reference path="GameObject.ts" />

class Leaf extends GameObject {
    private static readonly NAME = "leaf";
    private static readonly SOURCE = "./assets/img/leaf.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(Leaf.NAME, 1330, 620, canvas, Leaf.SOURCE);
    }
}