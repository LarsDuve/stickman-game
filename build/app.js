class GameObjects {
    constructor(imgSrc, xPos, yPos, name) {
        this._name = name;
        this._xPos = xPos;
        this._yPos = yPos;
        this._image = PrivacyRoom.loadNewImage(imgSrc);
        this._imageWidth = this._image.width;
        this._imageHeight = this.image.height;
    }
    get xPos() {
        return this._xPos;
    }
    get image() {
        return this._image;
    }
    get yPos() {
        return this._yPos;
    }
    get imageHeight() {
        return this._imageHeight;
    }
    get imageWidth() {
        return this._imageWidth;
    }
    get name() {
        return this._name;
    }
    draw(ctx) {
        ctx.drawImage(this._image, this._xPos, this._yPos, this._imageWidth, this._imageHeight);
    }
}
class CreepyMan extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("./assets/pictures/creepyMan.png", xPos, yPos, "CreepyMan");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
    }
}
class Laptop extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("./assets/pictures/laptopPrivacy.png", xPos, yPos, "Laptop");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
    }
}
let init = () => {
    const KiwiWars = new PrivacyRoom(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class PrivacyRoom {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.mouseListener();
        this.setBackgroundPrivacy();
        this.gameObjects = new Laptop(938, 305, 250, 200);
        this.draw();
    }
    draw() {
        this.writeTextToCanvas(this.ctx, `Score is:`, 40, 100, 40);
        this.gameObjects.draw(this.ctx);
    }
    setBackgroundPrivacy() {
        this.initialize();
    }
    initialize() {
        window.addEventListener('resize', this.resizeCanvas, false);
        this.resizeCanvas();
    }
    redraw() {
        const img = new Image();
        img.src = "./assets/pictures/backgroundPrivacy.png";
        this.ctx.drawImage(img, 0, 0);
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    }
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.redraw();
    }
    getMousePosition(event) {
        let rect = this.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        console.log(`Coordinate x: ${x}, Coordinate y: ${y}`);
        if (event.clientX >= this.gameObjects.xPos &&
            event.clientX < this.gameObjects.xPos + this.gameObjects.imageWidth &&
            event.clientY >= this.gameObjects.yPos &&
            event.clientY <= this.gameObjects.yPos + this.gameObjects.imageWidth) {
            if (this.gameObjects.name == "Laptop") {
                console.log("laptop geklikt");
            }
            else {
            }
        }
    }
    mouseListener() {
        this.canvas.addEventListener("mousedown", (e) => {
            this.getMousePosition(e);
        });
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=app.js.map