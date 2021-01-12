/// <reference path="GameObject.ts" />

class PasswordNoteZoom extends GameObject {
    private static readonly NAME = "password-note-zoom";
    private static readonly SOURCE = "./assets/img/note-zoom.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(PasswordNoteZoom.NAME, 521, 95, canvas, PasswordNoteZoom.SOURCE);
    }
}