class ScamRoom {

    private gameObjects: GameObjects[];
    private status: string;
    private gameState: GameState;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        // this.setBackground();
        canvas.addEventListener(`click`, this.mouseHandler);

        this.gameObjects = [];

        this.gameObjects.push(new Laptop(450, 600), new Character(1600, 620));

        this.status = `closed`;

        this.gameState = GameState.Keuken;

        this.loop();

    }

      /**
   * Method for the Game Loop
   * Based on the game state some actions have to be executed
   */
  private loop = () => {
    // Clear the canvas -> cxt.clearRect(...)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.gameState == GameState.Keuken) {
      this.draw(this.canvas);
    } else if (this.gameState == GameState.Laptop) {
        this.laptop(this.canvas);
    }
    requestAnimationFrame(this.loop);
  };

 

    /**
 * Method to handle the mouse event
 * @param {MouseEvent} event - mouse event
 */
    private mouseHandler = (event: MouseEvent) => {
        console.log(`xPos ${event.clientX}, yPos ${event.clientY}, target: ${event.target}`);
        for (let index = 0; index < this.gameObjects.length; index++) {
            if (event.clientX >= this.gameObjects[index].getXPos() &&
                event.clientX < this.gameObjects[index].getXPos() + this.gameObjects[index].getImageWidth() &&
                event.clientY >= this.gameObjects[index].getYPos() &&
                event.clientY <= this.gameObjects[index].getYPos() + this.gameObjects[index].getImageWidth()) {

                console.log(`clicked ${this.gameObjects[index].getName()}`);
                if(this.gameObjects[index].getName() === `laptop`){
                    // this.openLaptop();
                    this.gameState = GameState.Laptop
                }
            }
        }
    }

    private setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/keuken.png)`;
    }

    private setBackgroundLaptop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = `url(./assets/img/Laptopscherm.png)`;
    }

    // public openLaptop() { 
    //     this.status = `open`;
    //     // this.gameState = GameState.Laptop
    // }

    public draw(canvas: HTMLCanvasElement) {
        // const ctx = canvas.getContext('2d');
        this.setBackground();

        for (let index = 0; index < this.gameObjects.length; index++) {
            // console.log(this.gameObjects[index].getName());
            this.gameObjects[index].draw(canvas);
        }

        // if (this.status === `open`) {
        //     this.ctx.font = `32px Calibri`;
        //     this.ctx.fillStyle = "red";
        //     this.ctx.fillText(`Click all the bad links in time!`, canvas.width / 2, 40);
        //     // this.gameState = GameState.Laptop
        // }
    }
    public laptop(canvas:HTMLCanvasElement){
        this.status = `open`
        this.setBackgroundLaptop();
        this.gameObjects.push(new Website(`Website-1`, `./assets/img/chat-1.png`,90, 90));
        this.gameObjects.push(new Website(`Website-2`, `./assets/img/NigerianScamEmail-1.png`,1000, 90));
        // this.gameObjects.push(new Website(`Website-3`, `./assets/img/catfish_nazi_fb-865x452.png`,90, 575));
        // this.gameObjects.push(new Website(`Website-4`, `./assets/img/catfish_nazi_fb-865x452.png`,200, 200));
        for (let index = 2; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `32px Calibri`;
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`Welke foto is geen voorbeeld van catfishing `, 700, 38);
    }
}