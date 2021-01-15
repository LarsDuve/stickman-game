class LaptopScreen {

    private gameObjects: GameObjects[];
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

        
        // add an mouse event
        document.addEventListener("click", this.clickHandler);

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

    private name() {
    }

    private setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/laptopscreen.png)`;
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
                if (this.gameObjects[i].clickObjectState === "unclicked"){
                    console.log(`clicked ${this.gameObjects[i].getName()}`);
                    if (this.gameObjects[i].getName() === "arrowbutton") {
                        if (this.passwordInput.join("") === this.password.join("")) {
                            const stickmanGame = new Game(
                                document.getElementById("canvas") as HTMLCanvasElement
                            );
                            this.gameObjects = [];
                        }
                    } else if (this.gameObjects[i].getName() === "xbutton") {
                        this.minigame = new Minigame(this.canvas);
                        this.gameObjects = [];
                    }
                }
            }
        }
    };

    private keyPress = (ev: KeyboardEvent) => {
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
        this.drawGame();
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
    private drawGame() {
        this.gameObjects.forEach(gameObject => {
            gameObject.draw(this.canvas);
        });
    }

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