/// <reference path="GameObject.ts" />

class PasswordNote extends GameObject {
    private static readonly NAME = "password-note";
    private static readonly SOURCE = "./assets/img/note.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(PasswordNote.NAME, 380, 95, canvas, PasswordNote.SOURCE);
    }
}