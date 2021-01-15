class GameObjects {

    protected xPos: number;
    protected yPos: number;
    protected image: HTMLImageElement;
    protected name: string;
    public clickObjectState: string;

    constructor(name: string, imgSrc: string, xPos: number, yPos: number){
        this.image = GameMaster.loadNewImage(imgSrc);
        this.xPos = xPos;
        this.yPos = yPos;
        this.name = name;
        this.clickObjectState = "unclicked";
    }

    public getXPos(): number {
        return this.xPos;
    }

    public setXPos(newValue: number) {
        this.xPos = newValue;
    }

    public getYPos(): number {
        return this.yPos;
    }

    public getImage(): HTMLImageElement {
        return this.image;
    }

    public getImageWidth(): number {
        return this.image.width;
    }

    public getImageHeight(): number {
        return this.image.height;
    }

    public getName(): string {
        return this.name;
    }

    public move(canvas: HTMLCanvasElement) {

    }

    public draw(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.image, this.xPos, this.yPos);
    }
    
}