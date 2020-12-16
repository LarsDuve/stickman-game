class GameObjects {
    constructor(name, imgSrc, xPos, yPos) {
        this.image = Game.loadNewImage(imgSrc);
        this.xPos = xPos;
        this.yPos = yPos;
        this.name = name;
        this.imageHeight = this.image.height;
        this.imageWidth = this.image.width;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    getImage() {
        return this.image;
    }
    getImageWidth() {
        return this.imageWidth;
    }
    getImageHeight() {
        return this.imageHeight;
    }
    getName() {
        return this.name;
    }
    draw(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.image, this.xPos, this.yPos);
    }
}
class Character extends GameObjects {
    constructor(xPos, yPos) {
        super(`character`, `./assets/img/character.png`, xPos, yPos);
    }
}
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.scamRoom.draw(this.canvas);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.scamRoom = new ScamRoom(this.canvas);
        this.loop();
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class Laptop extends GameObjects {
    constructor(xPos, yPos) {
        super(`laptop`, `./assets/img/laptop-resize.png`, xPos, yPos);
    }
}
class ScamRoom {
    constructor(canvas) {
        this.mouseHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}, target: ${event.target}`);
            for (let index = 0; index < this.gameObjects.length; index++) {
                if (event.clientX >= this.gameObjects[index].getXPos() &&
                    event.clientX < this.gameObjects[index].getXPos() + this.gameObjects[index].getImageWidth() &&
                    event.clientY >= this.gameObjects[index].getYPos() &&
                    event.clientY <= this.gameObjects[index].getYPos() + this.gameObjects[index].getImageWidth()) {
                    console.log(`clicked ${this.gameObjects[index].getName()}`);
                    if (this.gameObjects[index].getName() === `laptop`) {
                        this.openLaptop();
                    }
                }
            }
        };
        this.setBackground();
        canvas.addEventListener(`click`, this.mouseHandler);
        this.gameObjects = [];
        this.gameObjects.push(new Laptop(850, 100), new Character(500, 200));
        this.links = [`www.gmail.com`, `www.gmoil.com`, `www.epicgames.com`, `www.epiicgames.com`, `www.rabobamk.nl`, `www.rabobank.nl`];
        this.status = `closed`;
    }
    setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/garage.png)`;
    }
    openLaptop() {
        this.status = `open`;
    }
    draw(canvas) {
        const ctx = canvas.getContext('2d');
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        if (this.status === `open`) {
            ctx.font = `32px Calibri`;
            ctx.fillStyle = "red";
            ctx.fillText(`Click all the bad links in time!`, canvas.width / 2, 40);
        }
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
//# sourceMappingURL=app.js.map