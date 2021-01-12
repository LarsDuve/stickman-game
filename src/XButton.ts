/// <reference path="GameObject.ts" />

class XButton extends GameObject {
    private static readonly NAME = "xbutton";
    private static readonly SOURCE = "./assets/img/xbutton.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(XButton.NAME, 1400 ,80, canvas, XButton.SOURCE);
    }
}