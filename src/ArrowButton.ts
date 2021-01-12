/// <reference path="GameObject.ts" />

class ArrowButton extends GameObject {
    private static readonly NAME = "arrowbutton";
    private static readonly SOURCE = "./assets/img/arrowbutton.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(ArrowButton.NAME, 879 ,439, canvas, ArrowButton.SOURCE);
    }
}