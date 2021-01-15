class Garage {

    private gameObjects: GameObjects[];
    private gameState: string;
    private numberOfLinks: number;
    private canvas: HTMLCanvasElement;
    private score: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.setBackground();
        this.canvas.addEventListener(`click`, this.clickHandler);
        this.gameObjects = [];

        this.gameObjects.push(new LightSwitch(250, 150));

        this.gameState = `start`;
        this.numberOfLinks = 3;

        this.score = 0;

    }

    /**
     * Method to handle the mouse event
     * @param {MouseEvent} event - mouse event
     */
    public clickHandler = (event: MouseEvent) => {
        console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);

        for (let i = 0; i < this.gameObjects.length; i++) {
            // simple click detection
            if (
                event.clientX >= this.gameObjects[i].getXPos() &&
                event.clientX < this.gameObjects[i].getXPos() + this.gameObjects[i].getImageWidth() &&
                event.clientY >= this.gameObjects[i].getYPos() &&
                event.clientY <= this.gameObjects[i].getYPos() + this.gameObjects[i].getImageHeight()
            ) {
                console.log(`clicked ${this.gameObjects[i].getName()}`)
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
    }

    private handleLightSwitch() {
        this.turnOnLights();
    }

    private handleChugJug() {
        this.chugJug();
    }

    private handleLaptop(i: number) {
        this.gameObjects.splice(i, 1);
        this.startGame();
    }

    private handleGoodLink(i: number) {
        console.log(`test`);
        this.gameObjects.splice(i, 1);
        this.score++;
    }

    private handleBadLink() {
        console.log(`test2`);
        this.gameState = `gameover`;
        this.gameObjects.splice(0, this.gameObjects.length);
        this.turnOnLights();
        this.score = 0;
    }

    private setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/garageLightsOut.png)`;
    }

    private turnOnLights() {
        document.body.style.backgroundImage = `url(./assets/img/garageLightsOn.png)`;
        this.gameObjects.push(new LaptopCatfish(850, 100), new Character(500, 200));
    }

    private chugJug() {
        this.gameObjects.push(new ChugJug(400, 300));
    }

    private startGame() {
        this.gameState = `start`;
        for (let i = 1; i < this.numberOfLinks + 1; i++) {
            this.gameObjects.push(new GoodLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
            this.gameObjects.push(new BadLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
        }
    }

    public draw(canvas: HTMLCanvasElement) {
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

    private drawGameover(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "red";
        ctx.fillText(`You clicked a bad link!`, canvas.width / 2, 40);
    }

    private drawWin(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "green";
        ctx.fillText(`You clicked all the right links! Score: ${this.score}`, canvas.width / 2, 40);
    }

    private drawStart(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "black";
        ctx.fillText(`Click all the right links! Score: ${this.score}`, canvas.width / 2, 40);
    }

    public move(canvas: HTMLCanvasElement) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].move(canvas);

        }
    }

    public checkScore() {
        if (this.score == this.numberOfLinks) {
            this.gameState = `win`;
            this.gameObjects.splice(0, this.gameObjects.length);
            this.turnOnLights();
        }
    }

}