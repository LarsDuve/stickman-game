class GameObjects {
    constructor(name, imgSrc, xPos, yPos) {
        this.image = Game.loadNewImage(imgSrc);
        this.xPos = xPos;
        this.yPos = yPos;
        this.name = name;
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
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    getName() {
        return this.name;
    }
    move(canvas) {
    }
    draw(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.image, this.xPos, this.yPos);
    }
}
class BadLink extends GameObjects {
    constructor(xPos, yPos, link) {
        super(`badlink`, `./assets/img/bad${link}.png`, xPos, yPos);
        this.xVelocity = Game.randomNumber(-5, 5);
        this.yVelocity = Game.randomNumber(-5, 5);
    }
    move(canvas) {
        this.xPos += this.xVelocity;
        this.yPos += this.yVelocity;
        if (this.xPos <= 0 || this.xPos + this.getImageWidth() >= canvas.width) {
            this.xVelocity = -this.xVelocity;
        }
        if (this.yPos <= 0 || this.yPos + this.getImageHeight() >= canvas.height) {
            this.yVelocity = -this.yVelocity;
        }
    }
}
class Character extends GameObjects {
    constructor(xPos, yPos) {
        super(`character`, `./assets/img/character.png`, xPos, yPos);
    }
}
class ChugJug extends GameObjects {
    constructor(xPos, yPos) {
        super(`chugjug`, `./assets/img/ChugJug-resize.png`, xPos, yPos);
    }
}
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.garage.draw(this.canvas);
            this.garage.move(this.canvas);
            this.garage.checkScore();
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.garage = new Garage(this.canvas);
        this.loop();
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class Garage {
    constructor(canvas) {
        this.clickHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            for (let i = 0; i < this.gameObjects.length; i++) {
                if (event.clientX >= this.gameObjects[i].getXPos() &&
                    event.clientX < this.gameObjects[i].getXPos() + this.gameObjects[i].getImageWidth() &&
                    event.clientY >= this.gameObjects[i].getYPos() &&
                    event.clientY <= this.gameObjects[i].getYPos() + this.gameObjects[i].getImageHeight()) {
                    console.log(`clicked ${this.gameObjects[i].getName()}`);
                    if (this.gameObjects[i].getName() == `lightswitch`) {
                        this.handleLightSwitch();
                    }
                    else if (this.gameObjects[i].getName() == `character`) {
                        this.handleChugJug();
                    }
                    else if (this.gameObjects[i].getName() == 'laptop') {
                        this.handleLaptop(i);
                    }
                    else if (this.gameObjects[i].getName() == `goodlink`) {
                        this.handleGoodLink(i);
                    }
                    else if (this.gameObjects[i].getName() == `badlink`) {
                        this.handleBadLink();
                    }
                }
            }
        };
        this.canvas = canvas;
        this.setBackground();
        this.canvas.addEventListener(`click`, this.clickHandler);
        this.gameObjects = [];
        this.gameObjects.push(new LightSwitch(250, 150));
        this.gameState = `start`;
        this.numberOfLinks = 3;
        this.score = 0;
    }
    handleLightSwitch() {
        this.turnOnLights();
    }
    handleChugJug() {
        this.chugJug();
    }
    handleLaptop(i) {
        this.gameObjects.splice(i, 1);
        this.startGame();
    }
    handleGoodLink(i) {
        console.log(`test`);
        this.gameObjects.splice(i, 1);
        this.score++;
    }
    handleBadLink() {
        console.log(`test2`);
        this.gameState = `gameover`;
        this.gameObjects.splice(0, this.gameObjects.length);
        this.turnOnLights();
        this.score = 0;
    }
    setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/garageLightsOut.png)`;
    }
    turnOnLights() {
        document.body.style.backgroundImage = `url(./assets/img/garageLightsOn.png)`;
        this.gameObjects.push(new Laptop(850, 100), new Character(500, 200));
    }
    chugJug() {
        this.gameObjects.push(new ChugJug(400, 300));
    }
    startGame() {
        this.gameState = `start`;
        for (let i = 1; i < this.numberOfLinks + 1; i++) {
            this.gameObjects.push(new GoodLink(Game.randomNumber(100, this.canvas.width - 400), Game.randomNumber(100, this.canvas.height - 150), i));
            this.gameObjects.push(new BadLink(Game.randomNumber(100, this.canvas.width - 400), Game.randomNumber(100, this.canvas.height - 150), i));
        }
    }
    draw(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        if (this.gameState === `startgame`) {
            this.drawStart(ctx, canvas);
        }
        if (this.gameState === `win`) {
            this.drawWin(ctx, canvas);
        }
        if (this.gameState === `gameover`) {
            this.drawGameover(ctx, canvas);
        }
    }
    drawGameover(ctx, canvas) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "red";
        ctx.fillText(`You clicked a bad link!`, canvas.width / 2, 40);
    }
    drawWin(ctx, canvas) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "green";
        ctx.fillText(`You clicked all the right links! Score: ${this.score}`, canvas.width / 2, 40);
    }
    drawStart(ctx, canvas) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "black";
        ctx.fillText(`Click all the right links! Score: ${this.score}`, canvas.width / 2, 40);
    }
    move(canvas) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].move(canvas);
        }
    }
    checkScore() {
        if (this.score == this.numberOfLinks) {
            this.gameState = `win`;
            this.gameObjects.splice(0, this.gameObjects.length);
            this.turnOnLights();
        }
    }
}
class GoodLink extends GameObjects {
    constructor(xPos, yPos, link) {
        super(`goodlink`, `./assets/img/good${link}.png`, xPos, yPos);
        this.xVelocity = Game.randomNumber(-3, 3);
        this.yVelocity = Game.randomNumber(-3, 3);
    }
    move(canvas) {
        this.xPos += this.xVelocity;
        this.yPos += this.yVelocity;
        if (this.xPos <= 0 || this.xPos + this.getImageWidth() >= canvas.width) {
            this.xVelocity = -this.xVelocity;
        }
        if (this.yPos <= 0 || this.yPos + this.getImageHeight() >= canvas.height) {
            this.yVelocity = -this.yVelocity;
        }
    }
}
class Laptop extends GameObjects {
    constructor(xPos, yPos) {
        super(`laptop`, `./assets/img/laptop-color.png`, xPos, yPos);
    }
}
class LightSwitch extends GameObjects {
    constructor(xPos, yPos) {
        super(`lightswitch`, `./assets/img/lightSwitchTransparent.png`, xPos, yPos);
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
//# sourceMappingURL=app.js.map