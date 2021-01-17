class Game {
    constructor(canvas) {
        this.loop = () => {
            this.draw();
<<<<<<< Updated upstream
            requestAnimationFrame(this.loop);
        };
        this.mouseHandler = (event) => {
            this.gameObjects.forEach(gameObject => {
                if (gameObject.hits(event.clientX, event.clientY)) {
                    if (gameObject.gameState === "unclicked") {
                        console.log(`clicked ${gameObject.getName()}`);
                        if (gameObject.getName() === "laptop") {
                            this.laptopscreen = new LaptopScreen(this.canvas);
                            this.gameObjects = [];
                        }
                    }
                }
            });
=======
            this.checkScore();
            requestAnimationFrame(this.loop);
        };
        this.clickHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            for (let i = 0; i < this.gameObjects.length; i++) {
                if (event.clientX >= this.gameObjects[i].getXPos() &&
                    event.clientX < this.gameObjects[i].getXPos() + this.gameObjects[i].getImageWidth() &&
                    event.clientY >= this.gameObjects[i].getYPos() &&
                    event.clientY <= this.gameObjects[i].getYPos() + this.gameObjects[i].getImageHeight()) {
                    if (this.gameObjects[i].clickObjectState === "unclicked") {
                        console.log(`clicked ${this.gameObjects[i].getName()}`);
                        if (this.gameState === "password") {
                            if (this.gameObjects[i].getName() === "trashcan") {
                                this.gameObjects[i].move(this.canvas);
                                this.gameObjects.push(new Trash(808, 550));
                                this.gameObjects[i].clickObjectState = "clicked";
                                console.log("test");
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
                            else if (this.gameObjects[i].getName() === "laptop-password") {
                                this.roomState = "passwordLaptopState";
                                this.gameObjects = [];
                                this.gameObjects.pop();
                                this.initiatePasswordLevel();
                                console.log(this.roomState);
                            }
                            else if (this.gameObjects[i].getName() === "xbutton") {
                                this.roomState = "passwordEndState";
                                this.initiatePasswordLevel();
                                console.log(this.roomState);
                            }
                            else if (this.gameObjects[i].getName() === "arrowbutton") {
                                this.roomState = "passwordFinalState";
                                this.initiatePasswordLevel();
                                console.log(this.roomState);
                            }
                        }
                        if (this.gameState === `garage`) {
                            if (this.gameObjects[i].getName() == `lightswitch`) {
                                this.handleLightSwitch();
                            }
                            else if (this.gameObjects[i].getName() == `character`) {
                                this.handleChugJug();
                            }
                            else if (this.gameObjects[i].getName() == `laptop`) {
                                this.handleLaptop(i);
                            }
                            else if (this.gameObjects[i].getName() == `goodlink`) {
                                this.handleGoodLink(i);
                            }
                            else if (this.gameObjects[i].getName() == `badlink`) {
                                this.handleBadLink();
                            }
                        }
                        if (this.gameState === "privacy") {
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
                            if (this.gameObjects[i].getName() === `Laptop`) {
                                console.log("laptop geklikt");
                                this.roomState = "laptopState";
                                console.log(this.roomState);
                            }
                            if (this.gameObjects[i].getName() === `nextPicture`) {
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
                        }
                        if (this.gameState === "catfish") {
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
            console.log(this.passwordInput.join(""));
            this.drawPasswordInput(this.ctx);
>>>>>>> Stashed changes
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
<<<<<<< Updated upstream
        console.log(this.canvas.width, this.canvas.height);
        this.setBackground();
        this.gameObjects = [];
        this.gameObjects.push(new Table(this.canvas));
        this.gameObjects.push(new Laptop(this.canvas));
        this.gameObjects.push(new CharacterSitting(this.canvas));
        this.gameObjects.push(new Trashcan(this.canvas));
        this.gameObjects.push(new Painting(this.canvas));
        this.gameObjects.push(new Plant(this.canvas));
        document.addEventListener("click", this.mouseHandler);
=======
        this.gameState = `garage`;
        if (this.gameState === `levelSelect`) {
            this.levelSelector();
        }
        if (this.gameState === `garage`) {
            this.initiateGarageLevel();
        }
        if (this.gameState === `password`) {
            this.roomState = "passwordLaptopState";
            this.initiatePasswordLevel();
        }
        if (this.gameState === `privacy`) {
            this.initiatePrivacyLevel();
        }
        window.addEventListener("keypress", this.keyPress);
        document.addEventListener("click", this.clickHandler);
>>>>>>> Stashed changes
        this.loop();
    }
    setBackground() {
        document.body.style.backgroundImage = `url(./assets/imgRoomOne/livingroom-empty.png)`;
    }
<<<<<<< Updated upstream
    draw() {
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGame(ctx);
=======
    initiatePasswordLevel() {
        if (this.roomState === "passwordBeginState") {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.gameObjects = [];
            this.keyListener = new KeyListener();
            this.passwordInput = [];
            this.password = ["a", "b", "c", "1", "2", "3"];
            document.body.style.backgroundImage = `url(./assets/imgPassword/livingroom-empty.png)`;
            this.gameObjects.push(new Table(380, 270));
            this.gameObjects.push(new LaptopPassword(650, 280));
            this.gameObjects.push(new CharacterSitting(543, 300));
            this.gameObjects.push(new Trashcan(780, 500));
            this.gameObjects.push(new Painting(360, 65));
            this.gameObjects.push(new Plant(1220, 340));
        }
        else if (this.roomState === "passwordLaptopState") {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.gameObjects = [];
            document.body.style.backgroundImage = `url(./assets/imgPassword/laptopscreen.png)`;
            this.gameObjects.push(new XButton(1400, 80));
            this.gameObjects.push(new ArrowButton(887, 447));
        }
        else if (this.roomState === "passwordEndState") {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.gameObjects = [];
            document.body.style.backgroundImage = `url(./assets/imgPassword/livingroom-empty.png)`;
            this.gameObjects.push(new Table(380, 270));
            this.gameObjects.push(new LaptopPassword(650, 280));
            this.gameObjects.push(new Chair(390, 350));
            this.gameObjects.push(new CharacterPassword(540, 300));
            this.gameObjects.push(new Trashcan(780, 500));
            this.gameObjects.push(new Painting(360, 65));
            this.gameObjects.push(new Plant(1220, 340));
        }
    }
    drawPasswordQuest(ctx, canvas) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "red";
        ctx.fillText(`Look around the room for your password`, canvas.width / 2, 40);
    }
    drawPasswordInput(ctx) {
        for (let i = 0; i < this.password.length; i++) {
            this.writeTextToCanvas(ctx, this.passwordInput.join(""), 25, 616, 468);
        }
>>>>>>> Stashed changes
    }
    drawGame(ctx) {
        this.gameObjects.forEach(gameObject => {
            gameObject.draw(ctx);
        });
    }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class GameObject {
    constructor(name, xPos, yPos, canvas, source) {
        this.name = name;
        this.xPos = xPos;
        this.yPos = yPos;
        this.image = this.loadNewImage(source);
        this.gameState = "unclicked";
    }
    getName() {
        return this.name;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    setXPos(newValue) {
        this.xPos = newValue;
    }
    getImageWidth() {
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    move(canvas) {
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.xPos, this.yPos);
    }
    hits(coordX, coordY) {
        return coordX >= this.xPos &&
            coordX < this.xPos + this.getImageWidth() &&
            coordY >= this.yPos &&
            coordY <= this.yPos + this.getImageHeight();
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
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
<<<<<<< Updated upstream
=======
let init = () => {
    const StickmanGame = new GameMaster(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class DiningRoomTop extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("diningRoomTopPicture", "./assets/img/DiningRoomTop.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class garageTop extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("garageTopPicture", "./assets/img/GarageTop.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class houseLevelSelector extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("houseLevelSelector", "./assets/img/house-top-down-view.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class kitchenTop extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("kitchenTopPicture", "./assets/img/KitchenTop.png", xPos, yPos);
        thisWidth = this.image.width;
        thisHeight = this.image.height;
    }
}
class livingRoomTop extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("livingRoomTopPicture", "./assets/img/livingRoomTop.png", xPos, yPos);
        thisWidth = this.image.width;
        thisHeight = this.image.height;
    }
}
class startButton extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("blindsClickerPicture", "./assets/imgPrivacy/start-button.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class startScreen extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("blindsClickerPicture", "./assets/imgPrivacy/start-scene.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class ArrowButton extends GameObjects {
    constructor(xPos, yPos) {
        super("arrowbutton", "./assets/imgPassword/arrowbutton.png", xPos, yPos);
    }
}
class Chair extends GameObjects {
    constructor(xPos, yPos) {
        super("chair", "./assets/imgPassword/chair.png", xPos, yPos);
    }
}
class CharacterPassword extends GameObjects {
    constructor(xPos, yPos) {
        super("character", "./assets/imgPassword/character.png", xPos, yPos);
    }
}
class CharacterSitting extends GameObjects {
    constructor(xPos, yPos) {
        super("character-sitting", "./assets/imgPassword/stickman-with-chair.png", xPos, yPos);
    }
}
class LaptopPassword extends GameObjects {
    constructor(xPos, yPos) {
        super("laptop-password", "./assets/imgPassword/laptop-password.png", xPos, yPos);
    }
}
class Leaf extends GameObjects {
    constructor(xPos, yPos) {
        super("leaf", "./assets/imgPassword/leaf.png", xPos, yPos);
    }
}
class Painting extends GameObjects {
    constructor(xPos, yPos) {
        super("painting", "./assets/imgPassword/painting.png", xPos, yPos);
    }
    move(canvas) {
        this.setXPos(this.getXPos() + 85);
    }
}
class PasswordNote extends GameObjects {
    constructor(xPos, yPos) {
        super("password-note", "./assets/imgPassword/note.png", xPos, yPos);
    }
}
class PasswordNoteZoom extends GameObjects {
    constructor(xPos, yPos) {
        super("password-note-zoom", "./assets/imgPassword/note-zoom.png", xPos, yPos);
    }
}
class Plant extends GameObjects {
    constructor(xPos, yPos) {
        super("plant", "./assets/imgPassword/plant.png", xPos, yPos);
    }
    move(canvas) {
        this.setXPos(this.getXPos() - 85);
    }
}
class Table extends GameObjects {
    constructor(xPos, yPos) {
        super("table", "./assets/imgPassword/table.png", xPos, yPos);
    }
}
class Trash extends GameObjects {
    constructor(xPos, yPos) {
        super("trash", "./assets/imgPassword/trash.png", xPos, yPos);
    }
}
class Trashcan extends GameObjects {
    constructor(xPos, yPos) {
        super("trashcan", "./assets/imgPassword/trashcan.png", xPos, yPos);
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
>>>>>>> Stashed changes
class LaptopScreen {
    constructor(canvas) {
        this.loop = () => {
            this.draw();
            const ctx = this.canvas.getContext("2d");
            this.drawPassword(ctx);
            requestAnimationFrame(this.loop);
        };
        this.mouseHandler = (event) => {
            this.gameObjects.forEach(gameObject => {
                if (gameObject.hits(event.clientX, event.clientY)) {
                    if (gameObject.gameState === "unclicked") {
                        console.log(`clicked ${gameObject.getName()}`);
                        if (gameObject.getName() === "arrowbutton") {
                            if (this.passwordInput.join("") === this.password.join("")) {
                                const stickmanGame = new Game(document.getElementById("canvas"));
                                this.gameObjects = [];
                            }
                        }
                        else if (gameObject.getName() === "xbutton") {
                            this.minigame = new Minigame(this.canvas);
                            this.gameObjects = [];
                        }
                    }
                }
            });
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
        this.gameObjects.push(new XButton(this.canvas));
        this.gameObjects.push(new ArrowButton(this.canvas));
        document.addEventListener("click", this.mouseHandler);
        window.addEventListener("keypress", this.keyPress);
        this.loop();
    }
    setBackground() {
        document.body.style.backgroundImage = `url(./assets/imgRoomOne/laptopscreen.png)`;
    }
    draw() {
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGame(ctx);
    }
    drawPassword(ctx) {
        for (let i = 0; i < this.password.length; i++) {
            this.writeTextToCanvas(ctx, this.passwordInput.join(""), 25, 616, 468);
        }
        this.writeTextToCanvas(ctx, "Tip: Misschien heb je je wachtwoord ergens achter verstopt", 19, 530, 500);
    }
    drawGame(ctx) {
        this.gameObjects.forEach(gameObject => {
            gameObject.draw(ctx);
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
        this.mouseHandler = (event) => {
            this.gameObjects.forEach(gameObject => {
                if (gameObject.hits(event.clientX, event.clientY)) {
                    if (gameObject.gameState === "unclicked") {
                        console.log(`clicked ${gameObject.getName()}`);
                        if (gameObject.getName() === "trashcan") {
                            gameObject.move(this.canvas);
                            this.gameObjects.push(new Trash(this.canvas));
                            gameObject.gameState = "clicked";
                        }
                        else if (gameObject.getName() === "painting") {
                            gameObject.move(this.canvas);
                            gameObject.gameState = "clicked";
                            this.gameObjects.push(new PasswordNote(this.canvas));
                        }
                        else if (gameObject.getName() === "plant") {
                            gameObject.move(this.canvas);
                            gameObject.gameState = "clicked";
                            this.gameObjects.push(new Leaf(this.canvas));
                        }
                        else if (gameObject.getName() === "password-note") {
                            this.gameObjects.push(new PasswordNoteZoom(this.canvas));
                        }
                        else if (gameObject.getName() === "password-note-zoom") {
                            this.gameObjects.pop();
                        }
                        else if (gameObject.getName() === "laptop") {
                            this.laptopscreen = new LaptopScreen(this.canvas);
                            this.gameObjects = [];
                            this.gameObjects.pop();
                        }
                    }
                }
            });
        };
        this.keyPress = (ev) => {
            console.log(`Key ${ev.key} has been pressed`);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log(this.canvas.width, this.canvas.height);
        this.setBackground();
        this.gameObjects = [];
        this.gameObjects.push(new Table(this.canvas));
        this.gameObjects.push(new Laptop(this.canvas));
        this.gameObjects.push(new Chair(this.canvas));
        this.gameObjects.push(new Character(this.canvas));
        this.gameObjects.push(new Trashcan(this.canvas));
        this.gameObjects.push(new Painting(this.canvas));
        this.gameObjects.push(new Plant(this.canvas));
        document.addEventListener("click", this.mouseHandler);
        window.addEventListener("keypress", this.keyPress);
        this.loop();
    }
    setBackground() {
        document.body.style.backgroundImage = `url(./assets/imgRoomOne/livingroom-empty.png)`;
    }
    draw() {
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGame(ctx);
    }
    drawGame(ctx) {
        this.gameObjects.forEach(gameObject => {
            gameObject.draw(ctx);
        });
    }
    drawGameOver(ctx) {
        this.writeTextToCanvas(ctx, "Game over", 60, this.canvas.width / 2, this.canvas.height / 2);
        this.writeTextToCanvas(ctx, `Your score is: `, 40, this.canvas.width / 2, this.canvas.height / 2 + 50);
    }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
let init = () => {
    const stickmanGame = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class ArrowButton extends GameObject {
    constructor(canvas) {
        super(ArrowButton.NAME, 879, 439, canvas, ArrowButton.SOURCE);
    }
}
<<<<<<< Updated upstream
ArrowButton.NAME = "arrowbutton";
ArrowButton.SOURCE = "./assets/imgRoomOne/arrowbutton.png";
class Chair extends GameObject {
=======
class GoodLink extends GameObjects {
    constructor(xPos, yPos, link) {
        super(`goodlink`, `./assets/imgSCAM/good${link}.png`, xPos, yPos);
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
        super("laptop", "./assets/imgSCAM/laptop-color.png", xPos, yPos);
    }
}
class LightSwitch extends GameObjects {
    constructor(xPos, yPos) {
        super(`lightswitch`, `./assets/imgSCAM/lightSwitchTransparent.png`, xPos, yPos);
    }
}
class ScamRoom {
>>>>>>> Stashed changes
    constructor(canvas) {
        super(Chair.NAME, 390, 350, canvas, Chair.SOURCE);
    }
}
Chair.NAME = "chair";
Chair.SOURCE = "./assets/imgRoomOne/chair.png";
class Character extends GameObject {
    constructor(canvas) {
        super(Character.NAME, 540, 300, canvas, Character.SOURCE);
    }
}
Character.NAME = "character";
Character.SOURCE = "./assets/imgRoomOne/character.png";
class CharacterSitting extends GameObject {
    constructor(canvas) {
        super(CharacterSitting.NAME, 543, 300, canvas, CharacterSitting.SOURCE);
    }
}
CharacterSitting.NAME = "character-sitting";
CharacterSitting.SOURCE = "./assets/imgRoomOne/stickman-with-chair.png";
class ForgotPassword extends GameObject {
    constructor(canvas) {
        super(ForgotPassword.NAME, 670, 480, canvas, ForgotPassword.SOURCE);
    }
}
ForgotPassword.NAME = "forgot-password";
ForgotPassword.SOURCE = "./assets/imgRoomOne/forgot-password.png";
class Laptop extends GameObject {
    constructor(canvas) {
        super(Laptop.NAME, 650, 280, canvas, Laptop.SOURCE);
    }
}
Laptop.NAME = "laptop";
Laptop.SOURCE = "./assets/imgRoomOne/laptop.png";
class Leaf extends GameObject {
    constructor(canvas) {
        super(Leaf.NAME, 1330, 620, canvas, Leaf.SOURCE);
    }
}
Leaf.NAME = "leaf";
Leaf.SOURCE = "./assets/imgRoomOne/leaf.png";
class Painting extends GameObject {
    constructor(canvas) {
        super(Painting.NAME, 360, 65, canvas, Painting.SOURCE);
    }
    move(canvas) {
        this.setXPos(this.getXPos() + 85);
    }
}
Painting.NAME = "painting";
Painting.SOURCE = "./assets/imgRoomOne/painting.png";
class PasswordNote extends GameObject {
    constructor(canvas) {
        super(PasswordNote.NAME, 380, 95, canvas, PasswordNote.SOURCE);
    }
}
PasswordNote.NAME = "password-note";
PasswordNote.SOURCE = "./assets/imgRoomOne/note.png";
class PasswordNoteZoom extends GameObject {
    constructor(canvas) {
        super(PasswordNoteZoom.NAME, 521, 95, canvas, PasswordNoteZoom.SOURCE);
    }
}
PasswordNoteZoom.NAME = "password-note-zoom";
PasswordNoteZoom.SOURCE = "./assets/imgRoomOne/note-zoom.png";
class Plant extends GameObject {
    constructor(canvas) {
        super(Plant.NAME, 1220, 340, canvas, Plant.SOURCE);
    }
    move(canvas) {
        this.setXPos(this.getXPos() - 85);
    }
}
Plant.NAME = "plant";
Plant.SOURCE = "./assets/imgRoomOne/plant.png";
class Table extends GameObject {
    constructor(canvas) {
        super(Table.NAME, 380, 270, canvas, Table.SOURCE);
    }
}
Table.NAME = "table";
Table.SOURCE = "./assets/imgRoomOne/table.png";
class Trash extends GameObject {
    constructor(canvas) {
        super(Trash.NAME, 808, 550, canvas, Trash.SOURCE);
    }
}
Trash.NAME = "trash";
Trash.SOURCE = "./assets/imgRoomOne/trash.png";
class Trashcan extends GameObject {
    constructor(canvas) {
        super(Trashcan.NAME, 780, 500, canvas, Trashcan.SOURCE);
    }
    move(canvas) {
        this.setXPos(this.getXPos() + 85);
    }
}
Trashcan.NAME = "trashcan";
Trashcan.SOURCE = "./assets/imgRoomOne/trashcan.png";
class XButton extends GameObject {
    constructor(canvas) {
        super(XButton.NAME, 1400, 80, canvas, XButton.SOURCE);
    }
}
XButton.NAME = "xbutton";
XButton.SOURCE = "./assets/imgRoomOne/xbutton.png";
//# sourceMappingURL=app.js.map