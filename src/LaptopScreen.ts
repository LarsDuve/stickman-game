class LaptopScreen {

    private gameObjects: GameObject[];
    private canvas: HTMLCanvasElement;
    private minigame: Minigame;

    private keyListener: KeyListener;
    
    private password: string[];
    private passwordInput: string[];

    
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


        this.keyListener = new KeyListener();

        this.passwordInput = [];
        this.password = ["a","b","c","1","2","3"];
    
        // create an array with all the GameObjects
        this.gameObjects = [];
        this.gameObjects.push(new XButton(this.canvas));
        this.gameObjects.push(new ArrowButton(this.canvas));
        
        // add an mouse event
        document.addEventListener("click", this.mouseHandler);

        window.addEventListener("keypress", this.keyPress);

        this.loop();
    }        
    
    /**
     * Method for the Game Loop
     */
    private loop = () => {
        this.draw();
        const ctx = this.canvas.getContext("2d");
        this.drawPassword(ctx);

        requestAnimationFrame(this.loop);
    };

    private setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/laptopscreen.png)`;
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
                    if (gameObject.getName() === "arrowbutton") {
                        if (this.passwordInput.join("") === this.password.join("")) {
                            const stickmanGame = new Game(
                                document.getElementById("canvas") as HTMLCanvasElement
                            );
                            this.gameObjects = [];
                        }
                    } else if (gameObject.getName() === "xbutton") {
                        this.minigame = new Minigame(this.canvas);
                        this.gameObjects = [];
                    }
                }
            }
        });
    };

    private keyPress = (ev: KeyboardEvent) => {
        // TODO handle key pressed events
        console.log(`Key ${ev.key} has been pressed`);
        this.passwordInput.push(ev.key);
        let indexes: number[] = [];
        for (let i = 0; i < this.password.length; i++) {
            if(ev.key === this.password[i]){
            console.log("Correct");
            indexes.push(i);
            }
        }
        console.log(this.passwordInput);
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

    private drawPassword(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.password.length; i++) {
            this.writeTextToCanvas(
                ctx,
                this.passwordInput.join(""),
                25,
                616,
                468
            );
        }
        this.writeTextToCanvas(
            ctx,
            "Tip: Misschien heb je je wachtwoord ergens achter verstopt",
            19,
            530,
            500
        );
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
        color: string = "black"
    ) {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = "left";
        ctx.fillText(text, xCoordinate, yCoordinate);
    }

}