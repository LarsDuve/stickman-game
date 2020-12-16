class GameObjects {
    protected _image: HTMLImageElement;
    protected _xPos: number;
    protected _yPos: number;
    protected _imageWidth: number;
    protected _imageHeight: number;
    protected _name: string;

    /** onstructor of the GameEntity class
     * @param {string} imgSrc @param {number} xPos @param {number} yPos
     * 
     **/

    public constructor(imgSrc: string, xPos:number, yPos:number,name: string)

    {   this._name = name;
        this._xPos = xPos;
        this._yPos = yPos;
        this._image = PrivacyRoom.loadNewImage(imgSrc);
        this._imageWidth = this._image.width;
        this._imageHeight = this.image.height;

    }
    
 public get xPos(): number {
     return this._xPos;
 }
 public get image(): HTMLImageElement {
     return this._image;
 }
 public get yPos(): number{
     return this._yPos;
 }
 public get imageHeight(): number{
     return this._imageHeight;
 }
 public get imageWidth(): number{
     return this._imageWidth;
 }
 public get name(): string{
     return this._name;
 }
  /**
     * Draw the image to the given canvas
     * @param {CanvasRenderingContext2D} ctx - context
     */
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this._image, this._xPos, this._yPos,this._imageWidth,this._imageHeight);
    }
}