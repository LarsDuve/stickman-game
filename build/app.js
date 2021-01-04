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
<<<<<<< HEAD
=======
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
>>>>>>> 519f2422fe30f0f1e3d884a306a671d8f1c13772
let init = () => {
    const KiwiWars = new PrivacyRoom(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class PrivacyRoom {
    constructor(canvas) {
        this.loop = () => {
            console.log(this.gameObjects);
            if (this.gameState === "laptopState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                console.log("gamestate changed");
                this.laptopState();
            }
            else if (this.gameState = "beginState") {
                this.setBackgroundPrivacy();
                this.beginState();
            }
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.gameObjects = [];
        this.mouseListener();
<<<<<<< HEAD
        this.loop();
    }
    laptopState() {
        if (this.gameState === "laptopState") {
            this.gameObjects.shift();
            this.gameObjects.push(new LaptopScreen(200, 50, 1300, 920));
            this.gameObjects.shift();
            this.gameObjects.push(new houseNumber(350, 200, 800, 600));
            this.draw();
        }
    }
    beginState() {
        if (this.gameState === "beginState") {
            this.gameObjects.shift();
            this.gameObjects.shift();
            this.gameObjects.push(new Laptop(850, 290, 250, 200));
            this.gameObjects.push(new CreepyMan(425, 200, 100, 200));
            this.draw();
        }
    }
    draw() {
=======
        this.setBackgroundPrivacy();
        this.gameObjects.push(new Laptop(850, 290, 250, 200));
        this.gameObjects.push(new CreepyMan(425, 200, 100, 200));
        this.draw();
    }
    draw() {
        this.writeTextToCanvas(this.ctx, `Score is:`, 40, 100, 40);
>>>>>>> 519f2422fe30f0f1e3d884a306a671d8f1c13772
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.ctx);
        }
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
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (event.clientX >= this.gameObjects[i].xPos &&
                event.clientX < this.gameObjects[i].xPos + this.gameObjects[i].imageWidth &&
                event.clientY >= this.gameObjects[i].yPos &&
                event.clientY <= this.gameObjects[i].yPos + this.gameObjects[i].imageWidth) {
                if (this.gameObjects[i].name == "Laptop") {
                    console.log("laptop geklikt");
<<<<<<< HEAD
                    this.gameState = "laptopState";
                    console.log(this.gameState);
=======
                }
                else {
>>>>>>> 519f2422fe30f0f1e3d884a306a671d8f1c13772
                }
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
<<<<<<< HEAD
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
class houseNumber extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("./assets/pictures/houseNumber.png", xPos, yPos, "houseNumber");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
    }
}
class LaptopScreen extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("./assets/pictures/laptopScreen.png", xPos, yPos, "laptopScreen");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
    }
}
class personBirthday extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("./assets/pictures/personBirthday.png", xPos, yPos, "personBirthday");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
    }
}
class personID extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("./assets/pictures/personID.png", xPos, yPos, "personID");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
=======
>>>>>>> 519f2422fe30f0f1e3d884a306a671d8f1c13772
    }
}
//# sourceMappingURL=app.js.map