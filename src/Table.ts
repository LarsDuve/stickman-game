/// <reference path="GameObject.ts" />

class Table extends GameObject {
    private static readonly NAME = "table";
    private static readonly SOURCE = "./assets/img/table.png";

    /**
     * Constructs an object of this class.
     * 
     * @param canvas the canvas to spawn on
     */
    public constructor(canvas: HTMLCanvasElement) {
        super(Table.NAME, 380, 270, canvas, Table.SOURCE);
    }

}