
class Game {
    private canvas: HTMLCanvasElement;

    private gameObjects: GameObject[];
    private laptopscreen: LaptopScreen;

    // KeyListener so the user can give input
    private keyListener: KeyListener;

    public constructor(canvas: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log(this.canvas.width, this.canvas.height);

        this.setBackground();

        // create an array with all the GameObjects
        this.gameObjects = [];
        this.gameObjects.push(new Table(this.canvas));
        this.gameObjects.push(new Laptop(this.canvas));
        this.gameObjects.push(new CharacterSitting(this.canvas));

        this.gameObjects.push(new Trashcan(this.canvas));
        this.gameObjects.push(new Painting(this.canvas));
        this.gameObjects.push(new Plant(this.canvas));

        // add an mouse event
        document.addEventListener("click", this.mouseHandler);

        this.loop();
    }

    /**
     * Method for the Game Loop
     */
    private loop = () => {
        this.draw();

        requestAnimationFrame(this.loop);
    }

    private setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/livingroom-empty.png)`;
    }

    /**
     * Method to handle the mouse event
     * @param {MouseEvent} event - mouse event
     */
    private mouseHandler = (event: MouseEvent) => {

        // if a movable item is clicked makes it move
        this.gameObjects.forEach(gameObject => {
            if (gameObject.hits(event.clientX, event.clientY)) {
                if (gameObject.gameState === "unclicked"){
                    console.log(`clicked ${gameObject.getName()}`);
                    if (gameObject.getName() === "laptop") {
                        this.laptopscreen = new LaptopScreen(this.canvas);
                        this.gameObjects = [];
                    }
                }
            }
        });
    };

    /**
     * Draws all the necessary elements to the canvas
     */
    private draw() {
        const ctx = this.canvas.getContext("2d");
        // clear the canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGame(ctx);
    }

    /*
     * Renders the Game screen
     * 
     * @param ctx the context to render on.
     */
    private drawGame(ctx: CanvasRenderingContext2D) {
        this.gameObjects.forEach(gameObject => {
            gameObject.draw(ctx);
        });
    }

    // /**
    //  * Renders a random number between min and max
    //  * @param {number} min - minimal time
    //  * @param {number} max - maximal time
    //  */
    // public static randomNumber(min: number, max: number): number {
    //     return Math.round(Math.random() * (max - min) + min);
    // }

    /**
     * Writes text to the canvas
     * @param {string} text - Text to write
     * @param {number} fontSize - Font size in pixels
     * @param {number} xCoordinate - Horizontal coordinate in pixels
     * @param {number} yCoordinate - Vertical coordinate in pixels
     * @param {string} alignment - Where to align the text
     * @param {string} color - The color of the text
     */
    private writeTextToCanvas(
        ctx: CanvasRenderingContext2D,
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "red"
    ) {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }

}



