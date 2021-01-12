/// <reference path=".././GameObject.ts" />

class Character extends GameObject {
    private static readonly NAME = "character";
    private static readonly SOURCE = "./assets/imgRoomOne/character.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(Character.NAME, 540, 300, canvas, Character.SOURCE);
    }
}