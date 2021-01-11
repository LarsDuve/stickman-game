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
let init = () => {
    const KiwiWars = new PrivacyRoom(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class PrivacyRoom {
    constructor(canvas) {
        this.loop = () => {
            console.log(this.gameObjects);
<<<<<<< HEAD
            for (let i = -100; i < this.gameObjects.length; i++) {
                this.gameObjects.shift();
            }
            console.log(this.gameState);
=======
>>>>>>> 681db4fb114698dcb64edffae46c98291232f247
            if (this.gameState === "laptopState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                console.log("gamestate changed");
                this.laptopState();
            }
<<<<<<< HEAD
            else if (this.gameState === "nextPictureState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.nextPictureState();
            }
            else if (this.gameState === "wrongUploadState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.setBackgroundPrivacy();
                this.wrongUploadState();
            }
            else if (this.gameState === "blindsUpBeginState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.setBackgroundPrivacy();
                this.blindsUpBeginState();
            }
            else if (this.gameState === "blindsUpWrongState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.setBackgroundPrivacy();
                this.blindsUpWrongState();
            }
            else {
                this.gameState = "beginState";
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.setBackgroundPrivacy();
                this.beginState();
            }
            console.log(this.counterForClicks);
=======
            else if (this.gameState = "beginState") {
                this.setBackgroundPrivacy();
                this.beginState();
            }
>>>>>>> 681db4fb114698dcb64edffae46c98291232f247
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.counterForClicks = 0;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.gameObjects = [];
        this.mouseListener();
        this.loop();
    }
<<<<<<< HEAD
    nextPictureState() {
        this.gameObjects.push(new LaptopScreen(200, 50, 1300, 920));
        if (this.counterForClicks === 0) {
            this.gameObjects.push(new houseNumber(350, 200, 800, 600));
        }
        else if (this.counterForClicks === 1) {
            this.gameObjects.push(new personBirthday(350, 200, 800, 600));
            this.gameObjects.push(new backPicture(1200, 750, 200, 150));
        }
        else if (this.counterForClicks === 2) {
            this.gameObjects.push(new personID(350, 200, 800, 600));
            this.gameObjects.push(new backPicture(1200, 750, 200, 150));
        }
        this.gameObjects.push(new nextPicture(1200, 600, 200, 150));
        this.gameObjects.push(new uploadPicture(1200, 350, 200, 150));
        this.draw();
    }
    laptopState() {
        this.gameObjects.push(new LaptopScreen(200, 50, 1300, 920));
        this.gameObjects.push(new houseNumber(350, 200, 800, 600));
        this.gameObjects.push(new nextPicture(1200, 600, 200, 150));
        this.gameObjects.push(new backPicture(1200, 750, 200, 150));
        this.gameObjects.push(new uploadPicture(1200, 350, 200, 150));
        this.draw();
    }
    beginState() {
        this.gameObjects.push(new blindsClickerPicture(600, 250, 50, -300));
        this.gameObjects.push(new Laptop(850, 290, 250, 200));
        this.gameObjects.push(new blindsPicture(330, 40, 290, 370));
        this.draw();
    }
    blindsUpBeginState() {
        this.gameObjects.push(new Laptop(850, 290, 250, 200));
        this.gameObjects.push(new blindsUpPicture(320, 22, 300, 300));
        this.gameObjects.push(new blindsClickerPicture(600, 50, 50, 300));
        this.draw();
    }
    wrongUploadState() {
        this.gameObjects.push(new Laptop(850, 290, 250, 200));
        this.gameObjects.push(new CreepyMan(400, 50, 200, 350));
        this.gameObjects.push(new blindsClickerPicture(600, 250, 50, -300));
        this.gameObjects.push(new blindsPicture(330, 40, 290, 370));
        this.draw();
    }
    blindsUpWrongState() {
        this.gameObjects.push(new Laptop(850, 290, 250, 200));
        this.gameObjects.push(new CreepyMan(400, 50, 200, 350));
        this.gameObjects.push(new blindsUpPicture(320, 22, 300, 300));
        this.gameObjects.push(new blindsClickerPicture(600, 50, 50, 300));
        this.draw();
=======
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
>>>>>>> 681db4fb114698dcb64edffae46c98291232f247
    }
    draw() {
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
<<<<<<< HEAD
                console.log(this.gameObjects[i].name);
                if (this.gameState === "beginState" && this.gameObjects[i].name === "blindsClickerPicture") {
                    console.log("blinds geklikt");
                    this.gameState = "blindsUpBeginState";
                    console.log(this.gameState);
                }
                if (this.gameState === "wrongUploadState" && this.gameObjects[i].name === "blindsClickerPicture") {
                    console.log("blinds geklikt");
                    this.gameState = "blindsUpWrongState";
                    console.log(this.gameState);
                }
=======
>>>>>>> 681db4fb114698dcb64edffae46c98291232f247
                if (this.gameObjects[i].name == "Laptop") {
                    console.log("laptop geklikt");
                    this.gameState = "laptopState";
                    console.log(this.gameState);
                }
<<<<<<< HEAD
                if (this.gameObjects[i].name == "nextPicture") {
                    this.counterForClicks += 1;
                    console.log("Next geklikt");
                    this.gameState = "nextPictureState";
                    console.log(this.gameState);
                    if (this.counterForClicks === 3) {
                        this.counterForClicks = 2;
                    }
                    console.log(this.counterForClicks);
                }
                if (this.gameObjects[i].name == "backPicture") {
                    this.counterForClicks -= 1;
                    if (this.counterForClicks === -1) {
                        this.counterForClicks = 0;
                    }
                    console.log(this.counterForClicks);
                }
                if (this.gameObjects[i].name == "uploadPicture" && (this.counterForClicks === 0 || this.counterForClicks === 2)) {
                    console.log("Upload geklikt");
                    this.gameState = "wrongUploadState";
                }
=======
>>>>>>> 681db4fb114698dcb64edffae46c98291232f247
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
<<<<<<< HEAD
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "black") {
=======
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
>>>>>>> 681db4fb114698dcb64edffae46c98291232f247
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
<<<<<<< HEAD
class backPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("./assets/pictures/Back.png", xPos, yPos, "backPicture");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
    }
}
class blindsClickerPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("./assets/pictures/BlindsClickerPicture.png", xPos, yPos, "blindsClickerPicture");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
    }
}
class blindsPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("./assets/pictures/BlindsPicture.png", xPos, yPos, "blindsPicture");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
    }
}
class blindsUpPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("./assets/pictures/BlindsUpPicture.png", xPos, yPos, "blindsUpPicture");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
    }
}
=======
>>>>>>> 681db4fb114698dcb64edffae46c98291232f247
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
<<<<<<< HEAD
class nextPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("./assets/pictures/Next.png", xPos, yPos, "nextPicture");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
    }
}
class uploadPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("./assets/pictures/Upload.png", xPos, yPos, "uploadPicture");
        this._imageHeight = thisHeight;
        this._imageWidth = thisWidth;
    }
}
=======
>>>>>>> 681db4fb114698dcb64edffae46c98291232f247
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
    }
}
//# sourceMappingURL=app.js.map