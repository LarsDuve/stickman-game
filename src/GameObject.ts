/**
 * Base class of the fruits.
 */
class GameObject {
    private name: string;
    private xPos: number;
    private yPos: number;
    private image: HTMLImageElement;
    public gameState: string;

    /**
     * Constructs an object of this class.
     * 
     * @param name the name of the Fruit
     * @param canvas the canvas to spawn on
     * @param source the source of the image file to load
     */
    public constructor(name: string, xPos: number, yPos: number, canvas: HTMLCanvasElement, source: string) {
        this.name = name;
        this.xPos = xPos;
        this.yPos = yPos;
        this.image = this.loadNewImage(source);
        this.gameState = "unclicked";
    }

    /**
     * Returns the Name.
     * 
     * @returns the Name.
     */
    public getName() : string {
        return this.name;
    }

    /**
     * Returns the X-position of the upper left corner of the image.
     * 
     * @return the X-position of the upper left corner of the image.
     */
    public getXPos(): number {
        return this.xPos;
    }

    /**
     * Returns the Y-position of the upper left corner of the image.
     * 
     * @return the Y-position of the upper left corner of the image.
     */
    public getYPos(): number {
        return this.yPos;
    }

    /**
     * Sets the xPos.
     * 
     * @param newValue the new value
     */
    public setXPos(newValue: number) {
        this.xPos = newValue;
    }

    /**
     * Sets the yPos.
     * 
     * @param newValue the new value
     */
    public setYPos(newValue: number) {
        this.yPos = newValue;
    }

    /**
     * Returns the width of the image in pixels.
     * 
     * @returns the width of the image in pixels.
     */
    public getImageWidth(): number {
        return this.image.width;
    }

    /**
     * Returns the height of the image in pixels.
     * 
     * @returns the height of the image in pixels.
     */
    public getImageHeight(): number {
        return this.image.height;
    }

    /**
     * Moves the fruit over the canvas.
     * 
     * @param canvas the canvas where the fruit lives on
     */
    public move(canvas: HTMLCanvasElement) {
    }

    /**
     * Render this fruit on the given context.
     * 
     * @param ctx the CanvasRenderingContext to draw on.
     */
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            this.xPos,
            this.yPos
        );


    }

    /**
     * Checks if the given coordinates collide with this fruit.
     * 
     * @param coordX the X-position of the coordinate to check
     * @param coordY the X-position of the coordinate to check
     */
    public hits(coordX: number, coordY: number): boolean {
        return coordX >= this.xPos &&
            coordX < this.xPos + this.getImageWidth() &&
            coordY >= this.yPos &&
            coordY <= this.yPos + this.getImageHeight();
    }


    /**
     * Loads an image so it doesn't flicker
     * @param {HTMLImageElement} source
     * @return HTMLImageElement - returns an image
     */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }

}