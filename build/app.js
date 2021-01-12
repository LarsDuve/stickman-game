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
    setYPos(newValue) {
        this.yPos = newValue;
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
class ArrowButton extends GameObject {
    constructor(canvas) {
        super(ArrowButton.NAME, 879, 439, canvas, ArrowButton.SOURCE);
    }
}
ArrowButton.NAME = "arrowbutton";
ArrowButton.SOURCE = "./assets/img/arrowbutton.png";
class Chair extends GameObject {
    constructor(canvas) {
        super(Chair.NAME, 390, 350, canvas, Chair.SOURCE);
    }
}
Chair.NAME = "chair";
Chair.SOURCE = "./assets/img/chair.png";
class Character extends GameObject {
    constructor(canvas) {
        super(Character.NAME, 540, 300, canvas, Character.SOURCE);
    }
}
Character.NAME = "character";
Character.SOURCE = "./assets/img/character.png";
class CharacterSitting extends GameObject {
    constructor(canvas) {
        super(CharacterSitting.NAME, 543, 300, canvas, CharacterSitting.SOURCE);
    }
}
CharacterSitting.NAME = "character-sitting";
CharacterSitting.SOURCE = "./assets/img/stickman-with-chair.png";
class ForgotPassword extends GameObject {
    constructor(canvas) {
        super(ForgotPassword.NAME, 670, 480, canvas, ForgotPassword.SOURCE);
    }
}
ForgotPassword.NAME = "forgot-password";
ForgotPassword.SOURCE = "./assets/img/forgot-password.png";
class Game {
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
                        if (gameObject.getName() === "laptop") {
                            this.laptopscreen = new LaptopScreen(this.canvas);
                            this.gameObjects = [];
                        }
                    }
                }
            });
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
        this.loop();
    }
    setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/livingroom-empty.png)`;
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
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
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
class Laptop extends GameObject {
    constructor(canvas) {
        super(Laptop.NAME, 650, 280, canvas, Laptop.SOURCE);
    }
}
Laptop.NAME = "laptop";
Laptop.SOURCE = "./assets/img/laptop.png";
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
        document.body.style.backgroundImage = `url(./assets/img/laptopscreen.png)`;
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
class Leaf extends GameObject {
    constructor(canvas) {
        super(Leaf.NAME, 1330, 620, canvas, Leaf.SOURCE);
    }
}
Leaf.NAME = "leaf";
Leaf.SOURCE = "./assets/img/leaf.png";
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
        document.body.style.backgroundImage = `url(./assets/img/livingroom-empty.png)`;
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
class Painting extends GameObject {
    constructor(canvas) {
        super(Painting.NAME, 360, 65, canvas, Painting.SOURCE);
    }
    move(canvas) {
        this.setXPos(this.getXPos() + 85);
    }
}
Painting.NAME = "painting";
Painting.SOURCE = "./assets/img/painting.png";
class PasswordNote extends GameObject {
    constructor(canvas) {
        super(PasswordNote.NAME, 380, 95, canvas, PasswordNote.SOURCE);
    }
}
PasswordNote.NAME = "password-note";
PasswordNote.SOURCE = "./assets/img/note.png";
class PasswordNoteZoom extends GameObject {
    constructor(canvas) {
        super(PasswordNoteZoom.NAME, 521, 95, canvas, PasswordNoteZoom.SOURCE);
    }
}
PasswordNoteZoom.NAME = "password-note-zoom";
PasswordNoteZoom.SOURCE = "./assets/img/note-zoom.png";
class Plant extends GameObject {
    constructor(canvas) {
        super(Plant.NAME, 1220, 340, canvas, Plant.SOURCE);
    }
    move(canvas) {
        this.setXPos(this.getXPos() - 85);
    }
}
Plant.NAME = "plant";
Plant.SOURCE = "./assets/img/plant.png";
class Table extends GameObject {
    constructor(canvas) {
        super(Table.NAME, 380, 270, canvas, Table.SOURCE);
    }
}
Table.NAME = "table";
Table.SOURCE = "./assets/img/table.png";
class Trash extends GameObject {
    constructor(canvas) {
        super(Trash.NAME, 808, 550, canvas, Trash.SOURCE);
    }
}
Trash.NAME = "trash";
Trash.SOURCE = "./assets/img/trash.png";
class Trashcan extends GameObject {
    constructor(canvas) {
        super(Trashcan.NAME, 780, 500, canvas, Trashcan.SOURCE);
    }
    move(canvas) {
        this.setXPos(this.getXPos() + 85);
    }
}
Trashcan.NAME = "trashcan";
Trashcan.SOURCE = "./assets/img/trashcan.png";
class XButton extends GameObject {
    constructor(canvas) {
        super(XButton.NAME, 1400, 80, canvas, XButton.SOURCE);
    }
}
XButton.NAME = "xbutton";
XButton.SOURCE = "./assets/img/xbutton.png";
let init = () => {
    const stickmanGame = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map