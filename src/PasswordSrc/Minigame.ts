class Minigame {
   
    private canvas: HTMLCanvasElement;
    private gameObjects: GameObjects[];
    private roomState: string;
    private ctx: CanvasRenderingContext2D;

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

        // create an array with all the GameObjects
        

        // add an mouse event

        this.loop();
    }

    /**
     * Method for the Game Loop
     */
    private loop = () => {
        this.draw();

        requestAnimationFrame(this.loop);
    };

 


  

    /**
     * Draws all the necessary elements to the canvas
     */
    private draw() {
        // clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGame();
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

    
