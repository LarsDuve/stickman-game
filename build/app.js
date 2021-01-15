class GameMaster {
    constructor(canvas) {
        this.loop = () => {
            this.garage.draw(this.canvas);
            this.garage.move(this.canvas);
            this.garage.checkScore();
            requestAnimationFrame(this.loop);
        };
        this.clickHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            for (let i = 0; i < this.gameObjects.length; i++) {
                if (event.clientX >= this.gameObjects[i].getXPos() &&
                    event.clientX < this.gameObjects[i].getXPos() + this.gameObjects[i].getImageWidth() &&
                    event.clientY >= this.gameObjects[i].getYPos() &&
                    event.clientY <= this.gameObjects[i].getYPos() + this.gameObjects[i].getImageHeight()) {
                    console.log(`clicked ${this.gameObjects[i].getName()}`);
                    if (this.gameObjects[i].clickObjectState === "unclicked") {
                        console.log(`clicked ${this.gameObjects[i].getName()}`);
                        if (this.gameObjects[i].getName() === "trashcan") {
                            this.gameObjects[i].move(this.canvas);
                            this.gameObjects.push(new Trash(808, 550));
                            this.gameObjects[i].clickObjectState = "clicked";
                        }
                        else if (this.gameObjects[i].getName() === "painting") {
                            this.gameObjects[i].move(this.canvas);
                            this.gameObjects[i].clickObjectState = "clicked";
                            this.gameObjects.push(new PasswordNote(380, 95));
                        }
                        else if (this.gameObjects[i].getName() === "plant") {
                            this.gameObjects[i].move(this.canvas);
                            this.gameObjects[i].clickObjectState = "clicked";
                            this.gameObjects.push(new Leaf(1330, 620));
                        }
                        else if (this.gameObjects[i].getName() === "password-note") {
                            this.gameObjects.push(new PasswordNoteZoom(521, 95));
                        }
                        else if (this.gameObjects[i].getName() === "password-note-zoom") {
                            this.gameObjects.pop();
                        }
                        else if (this.gameObjects[i].getName() === "laptop") {
                            this.laptopscreen = new LaptopScreen(this.canvas);
                            this.gameObjects = [];
                            this.gameObjects.pop();
                        }
                        if (this.roomState === "beginState" && this.gameObjects[i].getName() === "blindsClickerPicture") {
                            console.log("blinds geklikt");
                            this.roomState = "blindsUpBeginState";
                            console.log(this.roomState);
                        }
                        if (this.roomState === "wrongUploadState" && this.gameObjects[i].getName() === "blindsClickerPicture") {
                            console.log("blinds geklikt");
                            this.roomState = "blindsUpWrongState";
                            console.log(this.roomState);
                        }
                        if (this.gameObjects[i].getName() == "Laptop") {
                            console.log("laptop geklikt");
                            this.roomState = "laptopState";
                            console.log(this.roomState);
                        }
                        if (this.gameObjects[i].getName() == "nextPicture") {
                            this.counterForClicks += 1;
                            console.log("Next geklikt");
                            this.roomState = "nextPictureState";
                            console.log(this.roomState);
                            if (this.counterForClicks === 3) {
                                this.counterForClicks = 2;
                            }
                            console.log(this.counterForClicks);
                        }
                        if (this.gameObjects[i].getName() == "backPicture") {
                            this.counterForClicks -= 1;
                            if (this.counterForClicks === -1) {
                                this.counterForClicks = 0;
                            }
                            console.log(this.counterForClicks);
                        }
                        if (this.gameObjects[i].getName() == "uploadPicture" && (this.counterForClicks === 0 || this.counterForClicks === 2)) {
                            console.log("Upload geklikt");
                            this.roomState = "wrongUploadState";
                        }
                        if (this.gameObjects[i].getName() === `laptop`) {
                            this.roomState = "LaptopCatfish";
                        }
                        if (this.gameObjects[i].getName() === `Website-1` || this.gameObjects[i].getName() === `Website-2`) {
                            this.roomState = "WrongSite";
                        }
                        if (this.gameObjects[i].getName() === `Website-4`) {
                            this.roomState = "GoodSite";
                        }
                        if (this.gameObjects[i].getName() === `refresh`) {
                            this.roomState = "WrongSiteEnd";
                        }
                        if (this.gameObjects[i].getName() === `refresh-2`) {
                            this.roomState = "GoodSiteEnd";
                        }
                    }
                }
            }
        };
        this.keyPress = (ev) => {
            console.log(`Key ${ev.key} has been pressed`);
            this.passwordInput.push(ev.key);
            let indexes = [];
            for (let i = 0; i < this.password.length; i++) {
                if (ev.key === this.password[i]) {
                    indexes.push(i);
                }
            }
            console.log(this.passwordInput);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.counterForClicks = 0;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.garage = new Garage(this.canvas);
        this.keyListener = new KeyListener();
        this.loop();
    }
    nextPictureState() {
        this.gameObjects.push(new LaptopScreenPrivacy(200, 50, 1300, 920));
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
        this.gameObjects.push(new LaptopScreenPrivacy(200, 50, 1300, 920));
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
    checkScore() {
        if (this.score == this.numberOfLinks) {
            this.roomState = `win`;
            this.gameObjects.splice(0, this.gameObjects.length);
            this.turnOnLights();
        }
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
        this.roomState = `gameover`;
        this.gameObjects.splice(0, this.gameObjects.length);
        this.turnOnLights();
        this.score = 0;
    }
    setBackgroundSCAM() {
        document.body.style.backgroundImage = `url(./assets/img/garageLightsOut.png)`;
    }
    turnOnLights() {
        document.body.style.backgroundImage = `url(./assets/img/garageLightsOn.png)`;
        this.gameObjects.push(new LaptopCatfish(850, 100), new Character(500, 200));
    }
    chugJug() {
        this.gameObjects.push(new ChugJug(400, 300));
    }
    startGame() {
        this.roomState = `start`;
        for (let i = 1; i < this.numberOfLinks + 1; i++) {
            this.gameObjects.push(new GoodLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
            this.gameObjects.push(new BadLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
        }
    }
    setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/keuken.png)`;
    }
    setBackgroundLaptop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = `url(./assets/img/Laptopscherm.png)`;
    }
    setBackgroundSite() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = `url(./assets/img/Laptopscherm.png)`;
    }
    laptop(canvas) {
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundLaptop();
        this.gameObjects.push(new Website(`Website-1`, `./assets/img/chat-1.png`, 100, 90));
        this.gameObjects.push(new Website(`Website-2`, `./assets/img/NigerianScamEmail-1.png`, 1170, 90));
        this.gameObjects.push(new Website(`Website-3`, `./assets/img/the_nigerian_prince_scam.png`, 100, 480));
        this.gameObjects.push(new Website(`Website-4`, `./assets/img/whatsapp-berichtje.png`, 770, 90));
        this.gameObjects.push(new Website(`Website-5`, `./assets/img/whatsapp.png`, 1170, 480));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `32px Calibri`;
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`Welke foto is geen voorbeeld van catfishing `, 700, 38);
    }
    wrongSite(canvas) {
        console.log("error");
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundSite;
        this.gameObjects.push(new Website(`bankrekening`, `./assets/img/bankrekening.png`, 54, 44));
        this.gameObjects.push(new Website(`refresh`, `./assets/img/refresh.png`, 270, 44));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `102px Calibri`;
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Refresh de site `, 680, 120);
    }
    wrongSiteEnd(canvas) {
        console.log("verry nice");
        this.setBackgroundSite;
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundSite;
        this.gameObjects.push(new Website(`blut`, `./assets/img/blut.png`, 54, 44));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
    }
    goodSite(canvas) {
        console.log("verry nice");
        this.setBackgroundSite;
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundSite;
        this.gameObjects.push(new Website(`bankrekening`, `./assets/img/bankrekening.png`, 54, 44));
        this.gameObjects.push(new Website(`refresh-2`, `./assets/img/refresh-2.png`, 270, 44));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `102px Calibri`;
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Refresh de site `, 680, 120);
    }
    goodSiteEnd(canvas) {
        console.log("verry nice");
        this.setBackgroundSite;
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundSite;
        this.gameObjects.push(new Website(`rijk`, `./assets/img/rijk.png`, 54, 44));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
    }
    draw() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.canvas);
        }
        if (this.roomState === `startgame`) {
            this.drawStart(this.ctx, this.canvas);
        }
        if (this.roomState === `win`) {
            this.drawWin(this.ctx, this.canvas);
        }
        if (this.roomState === `gameover`) {
            this.drawGameover(this.ctx, this.canvas);
        }
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
class GameObjects {
    constructor(name, imgSrc, xPos, yPos) {
        this.image = GameMaster.loadNewImage(imgSrc);
        this.xPos = xPos;
        this.yPos = yPos;
        this.name = name;
        this.clickObjectState = "unclicked";
    }
    getXPos() {
        return this.xPos;
    }
    setXPos(newValue) {
        this.xPos = newValue;
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
class KeyListener {
    constructor() {
        this.keyCodeStates = new Array();
        this.keyCodeTyped = new Array();
        this.previousState = new Array();
        window.addEventListener("keydown", (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener("keyup", (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }
    onFrameStart() {
        this.keyCodeTyped = new Array();
        this.keyCodeStates.forEach((val, key) => {
            if (this.previousState[key] != val && !this.keyCodeStates[key]) {
                this.keyCodeTyped[key] = true;
                this.previousState[key] = val;
            }
        });
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
    isKeyTyped(keyCode) {
        return this.keyCodeTyped[keyCode] == true;
    }
}
KeyListener.KEY_ENTER = 13;
KeyListener.KEY_SHIFT = 16;
KeyListener.KEY_CTRL = 17;
KeyListener.KEY_ALT = 18;
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_DEL = 46;
KeyListener.KEY_1 = 49;
KeyListener.KEY_2 = 50;
KeyListener.KEY_3 = 51;
KeyListener.KEY_4 = 52;
KeyListener.KEY_5 = 53;
KeyListener.KEY_6 = 54;
KeyListener.KEY_7 = 55;
KeyListener.KEY_8 = 56;
KeyListener.KEY_9 = 57;
KeyListener.KEY_0 = 58;
KeyListener.KEY_A = 65;
KeyListener.KEY_B = 66;
KeyListener.KEY_C = 67;
KeyListener.KEY_D = 68;
KeyListener.KEY_E = 69;
KeyListener.KEY_F = 70;
KeyListener.KEY_G = 71;
KeyListener.KEY_H = 72;
KeyListener.KEY_I = 73;
KeyListener.KEY_J = 74;
KeyListener.KEY_K = 75;
KeyListener.KEY_L = 76;
KeyListener.KEY_M = 77;
KeyListener.KEY_N = 78;
KeyListener.KEY_O = 79;
KeyListener.KEY_P = 80;
KeyListener.KEY_Q = 81;
KeyListener.KEY_R = 82;
KeyListener.KEY_S = 83;
KeyListener.KEY_T = 84;
KeyListener.KEY_U = 85;
KeyListener.KEY_V = 86;
KeyListener.KEY_W = 87;
KeyListener.KEY_X = 88;
KeyListener.KEY_Y = 89;
KeyListener.KEY_Z = 90;
let init = () => {
    const KiwiWars = new GameMaster(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class ArrowButton extends GameObjects {
    constructor(xPos, yPos) {
        super("arrowbutton", "./assets/imgPassword/arrowbutton.png", xPos, yPos);
    }
}
class Chair extends GameObjects {
    constructor(xPos, yPos) {
        super("chair", "./assets/imgPassword/arrowbutton.png", xPos, yPos);
    }
}
class CharacterPassword extends GameObjects {
    constructor(xPos, yPos) {
        super("character", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
    }
}
class CharacterSitting extends GameObjects {
    constructor(xPos, yPos) {
        super("character-sitting", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
    }
}
class ForgotPassword extends GameObjects {
    constructor(xPos, yPos) {
        super("forgot-password", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
    }
}
class LaptopPassword extends GameObjects {
    constructor(xPos, yPos) {
        super("laptop", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
    }
}
class Leaf extends GameObjects {
    constructor(xPos, yPos) {
        super("leaf", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
    }
}
class Painting extends GameObjects {
    constructor(xPos, yPos) {
        super("painting", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
    }
    move(canvas) {
        this.setXPos(this.getXPos() + 85);
    }
}
class PasswordNote extends GameObjects {
    constructor(xPos, yPos) {
        super("password-note", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
    }
}
class PasswordNoteZoom extends GameObjects {
    constructor(xPos, yPos) {
        super("password-note-zoom", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
    }
}
class Plant extends GameObjects {
    constructor(xPos, yPos) {
        super("plant", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
    }
    move(canvas) {
        this.setXPos(this.getXPos() - 85);
    }
}
class Table extends GameObjects {
    constructor(xPos, yPos) {
        super("table", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
    }
}
class Trash extends GameObjects {
    constructor(xPos, yPos) {
        super("trash", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
    }
}
class Trashcan extends GameObjects {
    constructor(xPos, yPos) {
        super("trashcan", "./assets/imgPassword/laptopPrivacy.png", xPos, yPos);
    }
    move(canvas) {
        this.setXPos(this.getXPos() + 85);
    }
}
class XButton extends GameObjects {
    constructor(xPos, yPos) {
        super("xbutton", "./assets/imgPassword/xbutton.png", xPos, yPos);
    }
}
class LaptopScreen {
    constructor(canvas) {
        this.loop = () => {
            this.draw();
            const ctx = this.canvas.getContext("2d");
            this.drawPassword(ctx);
            requestAnimationFrame(this.loop);
        };
        this.clickHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            for (let i = 0; i < this.gameObjects.length; i++) {
                if (event.clientX >= this.gameObjects[i].getXPos() &&
                    event.clientX < this.gameObjects[i].getXPos() + this.gameObjects[i].getImageWidth() &&
                    event.clientY >= this.gameObjects[i].getYPos() &&
                    event.clientY <= this.gameObjects[i].getYPos() + this.gameObjects[i].getImageHeight()) {
                    console.log(`clicked ${this.gameObjects[i].getName()}`);
                    if (this.gameObjects[i].clickObjectState === "unclicked") {
                        console.log(`clicked ${this.gameObjects[i].getName()}`);
                        if (this.gameObjects[i].getName() === "arrowbutton") {
                            if (this.passwordInput.join("") === this.password.join("")) {
                                const stickmanGame = new Game(document.getElementById("canvas"));
                                this.gameObjects = [];
                            }
                        }
                        else if (this.gameObjects[i].getName() === "xbutton") {
                            this.minigame = new Minigame(this.canvas);
                            this.gameObjects = [];
                        }
                    }
                }
            }
        };
        this.keyPress = (ev) => {
            console.log(`Key ${ev.key} has been pressed`);
            this.passwordInput.push(ev.key);
            let indexes = [];
            for (let i = 0; i < this.password.length; i++) {
                if (ev.key === this.password[i]) {
                    console.log("Correct");
                    indexes.push(i);
                }
            }
            console.log(this.passwordInput);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log(this.canvas.width, this.canvas.height);
        this.setBackground();
        this.keyListener = new KeyListener();
        this.passwordInput = [];
        this.password = ["a", "b", "c", "1", "2", "3"];
        this.gameObjects = [];
        this.gameObjects.push(new XButton(1400, 80));
        this.gameObjects.push(new ArrowButton(879, 439));
        document.addEventListener("click", this.clickHandler);
        window.addEventListener("keypress", this.keyPress);
        this.loop();
    }
    setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/laptopscreen.png)`;
    }
    draw() {
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGame();
    }
    drawPassword(ctx) {
        for (let i = 0; i < this.password.length; i++) {
            this.writeTextToCanvas(ctx, this.passwordInput.join(""), 25, 616, 468);
        }
        this.writeTextToCanvas(ctx, "Tip: Misschien heb je je wachtwoord ergens achter verstopt", 19, 530, 500);
    }
    drawGame() {
        this.gameObjects.forEach(gameObject => {
            gameObject.draw(this.canvas);
        });
    }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "black") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = "left";
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class Minigame {
    constructor(canvas) {
        this.loop = () => {
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.clickHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            for (let i = 0; i < this.gameObjects.length; i++) {
                if (event.clientX >= this.gameObjects[i].getXPos() &&
                    event.clientX < this.gameObjects[i].getXPos() + this.gameObjects[i].getImageWidth() &&
                    event.clientY >= this.gameObjects[i].getYPos() &&
                    event.clientY <= this.gameObjects[i].getYPos() + this.gameObjects[i].getImageHeight()) {
                    console.log(`clicked ${this.gameObjects[i].getName()}`);
                    if (this.gameObjects[i].clickObjectState === "unclicked") {
                        console.log(`clicked ${this.gameObjects[i].getName()}`);
                        if (this.gameObjects[i].getName() === "trashcan") {
                            this.gameObjects[i].move(this.canvas);
                            this.gameObjects.push(new Trash(808, 550));
                            this.gameObjects[i].clickObjectState = "clicked";
                        }
                        else if (this.gameObjects[i].getName() === "painting") {
                            this.gameObjects[i].move(this.canvas);
                            this.gameObjects[i].clickObjectState = "clicked";
                            this.gameObjects.push(new PasswordNote(380, 95));
                        }
                        else if (this.gameObjects[i].getName() === "plant") {
                            this.gameObjects[i].move(this.canvas);
                            this.gameObjects[i].clickObjectState = "clicked";
                            this.gameObjects.push(new Leaf(1330, 620));
                        }
                        else if (this.gameObjects[i].getName() === "password-note") {
                            this.gameObjects.push(new PasswordNoteZoom(521, 95));
                        }
                        else if (this.gameObjects[i].getName() === "password-note-zoom") {
                            this.gameObjects.pop();
                        }
                        else if (this.gameObjects[i].getName() === "laptop") {
                            this.laptopscreen = new LaptopScreen(this.canvas);
                            this.gameObjects = [];
                            this.gameObjects.pop();
                        }
                    }
                }
            }
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log(this.canvas.width, this.canvas.height);
        this.setBackground();
        this.gameObjects = [];
        this.gameObjects.push(new Table(380, 270));
        this.gameObjects.push(new LaptopPassword(650, 280));
        this.gameObjects.push(new Chair(390, 350));
        this.gameObjects.push(new CharacterPassword(540, 300));
        this.gameObjects.push(new Trashcan(780, 500));
        this.gameObjects.push(new Painting(360, 65));
        this.gameObjects.push(new Plant(1220, 340));
        document.addEventListener("click", this.clickHandler);
        this.loop();
    }
    setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/livingroom-empty.png)`;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGame();
    }
    drawGame() {
        this.gameObjects.forEach(gameObject => {
            gameObject.draw(this.canvas);
        });
    }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "black") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.clickHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            for (let i = 0; i < this.passwordGameObjects.length; i++) {
                if (event.clientX >= this.passwordGameObjects[i].getXPos() &&
                    event.clientX < this.passwordGameObjects[i].getXPos() + this.passwordGameObjects[i].getImageWidth() &&
                    event.clientY >= this.passwordGameObjects[i].getYPos() &&
                    event.clientY <= this.passwordGameObjects[i].getYPos() + this.passwordGameObjects[i].getImageHeight()) {
                    console.log(`clicked ${this.passwordGameObjects[i].getName()}`);
                    if (this.passwordGameObjects[i].clickObjectState === "unclicked") {
                        console.log(`clicked ${this.passwordGameObjects[i].getName()}`);
                        if (this.passwordGameObjects[i].getName() === "laptop") {
                            this.laptopscreen = new LaptopScreen(this.canvas);
                            this.passwordGameObjects = [];
                        }
                    }
                }
            }
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log(this.canvas.width, this.canvas.height);
        this.setBackground();
        this.passwordGameObjects = [];
        this.passwordGameObjects.push(new Table(380, 270));
        this.passwordGameObjects.push(new LaptopPassword(650, 280));
        this.passwordGameObjects.push(new CharacterSitting(543, 300));
        this.passwordGameObjects.push(new Trashcan(780, 500));
        this.passwordGameObjects.push(new Painting(360, 65));
        this.passwordGameObjects.push(new Plant(1220, 340));
        document.addEventListener("click", this.clickHandler);
        this.loop();
    }
    setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/livingroom-empty.png)`;
    }
    draw() {
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGame();
    }
    drawGame() {
        this.passwordGameObjects.forEach(gameObject => {
            gameObject.draw(this.canvas);
        });
    }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
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
        this.gameObjects.push(new LaptopCatfish(850, 100), new Character(500, 200));
    }
    chugJug() {
        this.gameObjects.push(new ChugJug(400, 300));
    }
    startGame() {
        this.gameState = `start`;
        for (let i = 1; i < this.numberOfLinks + 1; i++) {
            this.gameObjects.push(new GoodLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
            this.gameObjects.push(new BadLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
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
class BadLink extends GameObjects {
    constructor(xPos, yPos, link) {
        super(`badlink`, `./assets/img/bad${link}.png`, xPos, yPos);
        this.xVelocity = GameMaster.randomNumber(-5, 5);
        this.yVelocity = GameMaster.randomNumber(-5, 5);
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
class GoodLink extends GameObjects {
    constructor(xPos, yPos, link) {
        super(`goodlink`, `./assets/img/good${link}.png`, xPos, yPos);
        this.xVelocity = GameMaster.randomNumber(-3, 3);
        this.yVelocity = GameMaster.randomNumber(-3, 3);
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
class LaptopPrivacy extends GameObjects {
    constructor(xPos, yPos) {
        super(`laptop`, `./assets/img/laptop-color.png`, xPos, yPos);
    }
}
class LightSwitch extends GameObjects {
    constructor(xPos, yPos) {
        super(`lightswitch`, `./assets/img/lightSwitchTransparent.png`, xPos, yPos);
    }
}
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
            else if (this.gameState == GameState.WrongSiteEnd) {
                this.wrongSiteEnd(this.canvas);
            }
            else if (this.gameState == GameState.GoodSiteEnd) {
                this.goodSiteEnd(this.canvas);
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
                    if (this.gameObjects[index].getName() === `refresh`) {
                        this.gameState = GameState.WrongSiteEnd;
                    }
                    if (this.gameObjects[index].getName() === `refresh-2`) {
                        this.gameState = GameState.GoodSiteEnd;
                    }
                }
            }
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        canvas.addEventListener(`click`, this.mouseHandler);
        this.gameObjects = [];
        this.gameObjects.push(new LaptopCatfish(450, 600), new CharacterCatfish(1600, 620));
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
    setBackgroundSite() {
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
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundLaptop();
        this.gameObjects.push(new Website(`Website-1`, `./assets/img/chat-1.png`, 100, 90));
        this.gameObjects.push(new Website(`Website-2`, `./assets/img/NigerianScamEmail-1.png`, 1170, 90));
        this.gameObjects.push(new Website(`Website-3`, `./assets/img/the_nigerian_prince_scam.png`, 100, 480));
        this.gameObjects.push(new Website(`Website-4`, `./assets/img/whatsapp-berichtje.png`, 770, 90));
        this.gameObjects.push(new Website(`Website-5`, `./assets/img/whatsapp.png`, 1170, 480));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `32px Calibri`;
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`Welke foto is geen voorbeeld van catfishing `, 700, 38);
    }
    wrongSite(canvas) {
        console.log("error");
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundSite;
        this.gameObjects.push(new Website(`bankrekening`, `./assets/img/bankrekening.png`, 54, 44));
        this.gameObjects.push(new Website(`refresh`, `./assets/img/refresh.png`, 270, 44));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `102px Calibri`;
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Refresh de site `, 680, 120);
    }
    wrongSiteEnd(canvas) {
        console.log("verry nice");
        this.setBackgroundSite;
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundSite;
        this.gameObjects.push(new Website(`blut`, `./assets/img/blut.png`, 54, 44));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
    }
    goodSite(canvas) {
        console.log("verry nice");
        this.setBackgroundSite;
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundSite;
        this.gameObjects.push(new Website(`bankrekening`, `./assets/img/bankrekening.png`, 54, 44));
        this.gameObjects.push(new Website(`refresh-2`, `./assets/img/refresh-2.png`, 270, 44));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `102px Calibri`;
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Refresh de site `, 680, 120);
    }
    goodSiteEnd(canvas) {
        console.log("verry nice");
        this.setBackgroundSite;
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundSite;
        this.gameObjects.push(new Website(`rijk`, `./assets/img/rijk.png`, 54, 44));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
    }
}
class GameCatfish {
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
    GameState[GameState["WrongSiteEnd"] = 4] = "WrongSiteEnd";
    GameState[GameState["GoodSiteEnd"] = 5] = "GoodSiteEnd";
})(GameState || (GameState = {}));
class CharacterCatfish extends GameObjects {
    constructor(xPos, yPos) {
        super(`character`, `./assets/img/character.png`, xPos, yPos);
    }
}
class LaptopCatfish extends GameObjects {
    constructor(xPos, yPos) {
        super(`laptop`, `./assets/img/laptop-resize.png`, xPos, yPos);
    }
}
class StartKnop extends GameObjects {
    constructor(xPos, yPos) {
        super("start-knop", "./assets/img/start-knop.png", xPos, yPos);
    }
}
class Website extends GameObjects {
    constructor(name, imgSrc, xPos, yPos) {
        super(name, imgSrc, xPos, yPos);
    }
}
class backPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("backPicture", "./assets/imgPrivacy/Back.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth = this.getImageHeight();
    }
}
class blindsClickerPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("blindsClickerPicture", "./assets/imgPrivacy/BlindsClickerPicture.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth = this.getImageHeight();
    }
}
class blindsPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("blindsPicture", "./assets/imgPrivacy/BlindsPicture.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth = this.getImageHeight();
    }
}
class blindsUpPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("blindsUpPicture", "./assets/imgPrivacy/BlindsUpPicture.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth = this.getImageHeight();
    }
}
class CreepyMan extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("CreepyMan", "./assets/imgPrivacy/creepyMan.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth = this.getImageHeight();
    }
}
class Laptop extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("Laptop", "./assets/imgPrivacy/laptopPrivacy.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth = this.getImageHeight();
    }
}
class nextPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("nextPicture", "./assets/imgPrivacy/Next.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth = this.getImageHeight();
    }
}
class uploadPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("uploadPicture", "./assets/imgPrivacy/Upload.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth = this.getImageHeight();
    }
}
class houseNumber extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("houseNumber", "./assets/imgPrivacy/houseNumber.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth = this.getImageHeight();
    }
}
class LaptopScreenPrivacy extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("laptopScreen", "./assets/imgPrivacy/laptopScreen.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth = this.getImageHeight();
    }
}
class personBirthday extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("personBirthday", "./assets/imgPrivacy/personBirthday.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth = this.getImageHeight();
    }
}
class personID extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("personID", "./assets/imgPrivacy/personID.png", xPos, yPos);
        thisHeight = this.getImageHeight();
        thisWidth = this.getImageHeight();
    }
}
class PrivacyRoom {
    constructor(canvas) {
        this.loop = () => {
            console.log(this.gameObjects);
            for (let i = -100; i < this.gameObjects.length; i++) {
                this.gameObjects.shift();
            }
            console.log(this.gameState);
            if (this.gameState === "laptopState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                console.log("gamestate changed");
                this.laptopState();
            }
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
    nextPictureState() {
        this.gameObjects.push(new LaptopScreenPrivacy(200, 50, 1300, 920));
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
        this.gameObjects.push(new LaptopScreenPrivacy(200, 50, 1300, 920));
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
    }
    draw() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.canvas);
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
            if (event.clientX >= this.gameObjects[i].getXPos() &&
                event.clientX < this.gameObjects[i].getXPos() + this.gameObjects[i].getImageWidth() &&
                event.clientY >= this.gameObjects[i].getYPos() &&
                event.clientY <= this.gameObjects[i].getYPos() + this.gameObjects[i].getImageHeight()) {
                console.log(this.gameObjects[i].getName());
                if (this.gameState === "beginState" && this.gameObjects[i].getName() === "blindsClickerPicture") {
                    console.log("blinds geklikt");
                    this.gameState = "blindsUpBeginState";
                    console.log(this.gameState);
                }
                if (this.gameState === "wrongUploadState" && this.gameObjects[i].getName() === "blindsClickerPicture") {
                    console.log("blinds geklikt");
                    this.gameState = "blindsUpWrongState";
                    console.log(this.gameState);
                }
                if (this.gameObjects[i].getName() == "Laptop") {
                    console.log("laptop geklikt");
                    this.gameState = "laptopState";
                    console.log(this.gameState);
                }
                if (this.gameObjects[i].getName() == "nextPicture") {
                    this.counterForClicks += 1;
                    console.log("Next geklikt");
                    this.gameState = "nextPictureState";
                    console.log(this.gameState);
                    if (this.counterForClicks === 3) {
                        this.counterForClicks = 2;
                    }
                    console.log(this.counterForClicks);
                }
                if (this.gameObjects[i].getName() == "backPicture") {
                    this.counterForClicks -= 1;
                    if (this.counterForClicks === -1) {
                        this.counterForClicks = 0;
                    }
                    console.log(this.counterForClicks);
                }
                if (this.gameObjects[i].getName() == "uploadPicture" && (this.counterForClicks === 0 || this.counterForClicks === 2)) {
                    console.log("Upload geklikt");
                    this.gameState = "wrongUploadState";
                }
            }
        }
    }
    mouseListener() {
        this.canvas.addEventListener("mousedown", (e) => {
            this.getMousePosition(e);
        });
    }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "black") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=app.js.map