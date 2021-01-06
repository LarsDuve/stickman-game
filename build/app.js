class Game {
    constructor(canvas) {
        this.loop = () => {
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.mouseHandler = (event) => {
            this.gameObjects.forEach(gameObject => {
                if (gameObject.hits(event.clientX, event.clientY)) {
                    console.log(`clicked ${gameObject.getName()}`);
                    if (gameObject.getName() === "trashcan") {
                        gameObject.move(this.canvas);
                    }
                    else if (gameObject.getName() === "painting") {
                        gameObject.move(this.canvas);
                    }
                    else if (gameObject.getName() === "plant") {
                        gameObject.move(this.canvas);
                    }
                }
            });
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.setBackground();
        this.gameObjects = [];
        this.gameObjects.push(new Table(this.canvas));
        this.gameObjects.push(new Trashcan(this.canvas));
        this.gameObjects.push(new Painting(this.canvas));
        this.gameObjects.push(new Plant(this.canvas));
        this.gameObjects.push(new Laptop(this.canvas));
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
class GameObject {
    constructor(name, xPos, yPos, canvas, source) {
        this.name = name;
        this.xPos = xPos;
        this.yPos = yPos;
        this.image = this.loadNewImage(source);
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
class Laptop extends GameObject {
    constructor(canvas) {
        super(Laptop.NAME, 650, 280, canvas, Laptop.SOURCE);
    }
}
Laptop.NAME = "laptop";
Laptop.SOURCE = "./assets/img/laptop.png";
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
class Plant extends GameObject {
    constructor(canvas) {
        super(Plant.NAME, 1220, 340, canvas, Plant.SOURCE);
    }
    move(canvas) {
        this.setXPos(this.getXPos() + 85);
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
let init = () => {
    const KiwiWars = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map