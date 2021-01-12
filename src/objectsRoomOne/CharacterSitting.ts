/// <reference path=".././GameObject.ts" />

class CharacterSitting extends GameObject {
    private static readonly NAME = "character-sitting";
    private static readonly SOURCE = "./assets/imgRoomOne/stickman-with-chair.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(CharacterSitting.NAME, 543, 300, canvas, CharacterSitting.SOURCE);
    }
}