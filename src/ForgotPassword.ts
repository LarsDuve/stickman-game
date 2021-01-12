/// <reference path="GameObject.ts" />

class ForgotPassword extends GameObject {
    private static readonly NAME = "forgot-password";
    private static readonly SOURCE = "./assets/img/forgot-password.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(ForgotPassword.NAME, 670, 480, canvas, ForgotPassword.SOURCE);
    }
}