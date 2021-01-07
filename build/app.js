class ScamRoom {
    constructor(canvas) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.gameState == GameState.Keuken) {
                this.draw(this.canvas);
            }
            else if (this.gameState == GameState.Laptop) {
                this.laptop(this.canvas);
            }
            else if (this.gameState == GameState.WrongSite) {
                this.wrongSite(this.canvas);
            }
            else if (this.gameState == GameState.GoodSite) {
                this.goodSite(this.canvas);
            }
            requestAnimationFrame(this.loop);
        };
        this.mouseHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}, target: ${event.target}`);
            for (let index = 0; index < this.gameObjects.length; index++) {
                if (event.clientX >= this.gameObjects[index].getXPos() &&
                    event.clientX < this.gameObjects[index].getXPos() + this.gameObjects[index].getImageWidth() &&
                    event.clientY >= this.gameObjects[index].getYPos() &&
                    event.clientY <= this.gameObjects[index].getYPos() + this.gameObjects[index].getImageWidth()) {
                    console.log(`clicked ${this.gameObjects[index].getName()}`);
                    if (this.gameObjects[index].getName() === `laptop`) {
                        this.gameState = GameState.Laptop;
                    }
                    if (this.gameObjects[index].getName() === `Website-1` || this.gameObjects[index].getName() === `Website-2`) {
                        this.gameState = GameState.WrongSite;
                    }
                    if (this.gameObjects[index].getName() === `Website-4`) {
                        this.gameState = GameState.GoodSite;
                    }
                }
            }
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        canvas.addEventListener(`click`, this.mouseHandler);
        this.gameObjects = [];
        this.gameObjects.push(new Laptop(450, 600), new Character(1600, 620));
        this.status = `closed`;
        this.gameState = GameState.Keuken;
        this.loop();
    }
    setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/keuken.png)`;
    }
    setBackgroundLaptop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = `url(./assets/img/Laptopscherm.png)`;
    }
    setBackgroundWrogSite() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = `url(./assets/img/Laptopscherm.png)`;
    }
    setBackgroundGoodSite() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = `url(./assets/img/Laptopscherm.png)`;
    }
    draw(canvas) {
        this.setBackground();
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
    }
    laptop(canvas) {
        this.status = `open`;
        this.setBackgroundLaptop();
        this.gameObjects.push(new Website(`Website-1`, `./assets/img/chat-1.png`, 100, 90));
        this.gameObjects.push(new Website(`Website-2`, `./assets/img/NigerianScamEmail-1.png`, 1170, 90));
        this.gameObjects.push(new Website(`Website-3`, `./assets/img/the_nigerian_prince_scam.png`, 100, 480));
        this.gameObjects.push(new Website(`Website-4`, `./assets/img/whatsapp-berichtje.png`, 770, 90));
        this.gameObjects.push(new Website(`Website-5`, `./assets/img/whatsapp.png`, 1170, 480));
        for (let index = 2; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `32px Calibri`;
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`Welke foto is geen voorbeeld van catfishing `, 700, 38);
    }
    wrongSite(canvas) {
        console.log("error");
        this.setBackgroundWrogSite;
    }
    goodSite(canvas) {
        console.log("verry nice");
        this.setBackgroundGoodSite;
    }
}
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
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.scamRoom = new ScamRoom(this.canvas);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
var GameState;
(function (GameState) {
    GameState[GameState["Keuken"] = 0] = "Keuken";
    GameState[GameState["Laptop"] = 1] = "Laptop";
    GameState[GameState["WrongSite"] = 2] = "WrongSite";
    GameState[GameState["GoodSite"] = 3] = "GoodSite";
})(GameState || (GameState = {}));
class Laptop extends GameObjects {
    constructor(xPos, yPos) {
        super(`laptop`, `./assets/img/laptop-resize.png`, xPos, yPos);
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
class Website extends GameObjects {
    constructor(name, imgSrc, xPos, yPos) {
        super(name, imgSrc, xPos, yPos);
    }
}
//# sourceMappingURL=app.js.map