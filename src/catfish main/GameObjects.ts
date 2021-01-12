class GameObjects {

    protected xPos: number;
    protected yPos: number;
    protected image: HTMLImageElement;
    protected imageWidth: number;
    protected imageHeight: number;
    protected name: string;

    constructor(name: string, imgSrc: string, xPos: number, yPos: number){
        this.image = Game.loadNewImage(imgSrc);
        this.xPos = xPos;
        this.yPos = yPos;
        this.name = name;
        this.imageHeight = this.image.height;
        this.imageWidth = this.image.width;
    }

    public getXPos(): number {
        return this.xPos;
    }

    public getYPos(): number {
        return this.yPos;
    }

    public getImage(): HTMLImageElement {
        return this.image;
    }

    public getImageWidth(): number {
        return this.imageWidth;
    }

    public getImageHeight(): number {
        return this.imageHeight;
    }

    public getName(): string {
        return this.name;
    }

    public draw(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.image, this.xPos, this.yPos);
    }
    
}