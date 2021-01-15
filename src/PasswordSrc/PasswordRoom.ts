
class Game {
    private canvas: HTMLCanvasElement;

    private passwordGameObjects: GameObjects[];
    private laptopscreen: LaptopScreen;
    private ctx: CanvasRenderingContext2D

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
        this.GameObjects = [];
        this.GameObjects.push(new Table(380, 270));
        this.GameObjects.push(new LaptopPassword(650, 280));
        this.GameObjects.push(new CharacterSitting(543, 300));
        this.GameObjects.push(new Trashcan(780 ,500));
        this.GameObjects.push(new Painting(360, 65));
        this.GameObjects.push(new Plant(1220, 340));



        // add an mouse event
        document.addEventListener("click", this.clickHandler);

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
    public clickHandler = (event: MouseEvent) => {
        console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);

        for (let i = 0; i < this.passwordGameObjects.length; i++) {
            // simple click detection
            if (
                event.clientX >= this.passwordGameObjects[i].getXPos() &&
                event.clientX < this.passwordGameObjects[i].getXPos() + this.passwordGameObjects[i].getImageWidth() &&
                event.clientY >= this.passwordGameObjects[i].getYPos() &&
                event.clientY <= this.passwordGameObjects[i].getYPos() + this.passwordGameObjects[i].getImageHeight()
            ) {
                console.log(`clicked ${this.passwordGameObjects[i].getName()}`)
                if (this.passwordGameObjects[i].clickObjectState === "unclicked"){
                    console.log(`clicked ${this.passwordGameObjects[i].getName()}`);
                    if (this.passwordGameObjects[i].getName() === "laptop") {
                        this.laptopscreen = new LaptopScreen(this.canvas);
                        this.passwordGameObjects = [];
                    }
                }
            }
        }
    };

    /**
     * Draws all the necessary elements to the canvas
     */
    private draw() {
        const ctx = this.canvas.getContext("2d");
        // clear the canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGame();
    }

    /*
     * Renders the Game screen
     * 
     * @param ctx the context to render on.
     */
    private drawGame() {
        this.passwordGameObjects.forEach(gameObject => {
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
        color: string = "red"
    ) {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }

}



