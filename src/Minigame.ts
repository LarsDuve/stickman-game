class Minigame {
    private gameObjects: GameObject[];
    private canvas: HTMLCanvasElement;
    private laptopscreen: LaptopScreen;


    /**
     * Constructs an object of this class.
     * 
     * @param canvas the Canvas element to render to
     */
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
        this.gameObjects.push(new Chair(this.canvas));
        this.gameObjects.push(new Character(this.canvas));

        this.gameObjects.push(new Trashcan(this.canvas));
        this.gameObjects.push(new Painting(this.canvas));
        this.gameObjects.push(new Plant(this.canvas));

        // add an mouse event
        document.addEventListener("click", this.mouseHandler);

        // Attach an eventlistener to the keyUp event
        window.addEventListener("keypress", this.keyPress);

        this.loop();
    }

    /**
     * Method for the Game Loop
     */
    private loop = () => {
        this.draw();

        requestAnimationFrame(this.loop);
    };

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
                    if (gameObject.getName() === "trashcan") {
                        gameObject.move(this.canvas);
                        this.gameObjects.push(new Trash(this.canvas));
                        gameObject.gameState = "clicked";
                    } else if (gameObject.getName() === "painting") {
                        gameObject.move(this.canvas);
                        gameObject.gameState = "clicked";
                        this.gameObjects.push(new PasswordNote(this.canvas));
                    } else if (gameObject.getName() === "plant") {
                        gameObject.move(this.canvas);
                        gameObject.gameState = "clicked";
                        this.gameObjects.push(new Leaf(this.canvas));
                    } else if (gameObject.getName() === "password-note") {
                        this.gameObjects.push(new PasswordNoteZoom(this.canvas));
                    } else if (gameObject.getName() === "password-note-zoom") {
                        this.gameObjects.pop();
                    } else if (gameObject.getName() === "laptop") {
                        this.laptopscreen = new LaptopScreen(this.canvas);
                        this.gameObjects = [];
                        this.gameObjects.pop();
                    }
                }
            }
        });
    };

    private keyPress = (ev: KeyboardEvent) => {
        // TODO handle key pressed events
        console.log(`Key ${ev.key} has been pressed`);
    }

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

        // //write the current score
        // this.writeTextToCanvas(
        //     ctx,
        //     `Timer: `,
        //     40,
        //     100,
        //     40
        // );
    }

    /*
     * Renders the Game Over screen
     * 
     * @param ctx the context to draw on
     */
    private drawGameOver(ctx: CanvasRenderingContext2D) {
        this.writeTextToCanvas(
            ctx,
            "Game over",
            60,
            this.canvas.width / 2,
            this.canvas.height / 2
        );

        // draw the end score
        this.writeTextToCanvas(
            ctx,
            `Your score is: `,
            40,
            this.canvas.width / 2,
            this.canvas.height / 2 + 50
        );
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

