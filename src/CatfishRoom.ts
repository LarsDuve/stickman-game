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
        // this.gameState = GameState.Laptop;

        this.loop();

    }

      /**
   * Method for the Game Loop
   * Based on the game state some actions have to be executed
   */
  private loop = () => {
    // Clear the canvas -> cxt.clearRect(...)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // for (let i = -100; i < this.gameObjects.length; i++) {
    //     this.gameObjects.shift();
    // }

    if (this.gameState == GameState.Keuken) {
      this.draw(this.canvas);
    } else if (this.gameState == GameState.Laptop) {
        this.laptop(this.canvas);
    }else if (this.gameState == GameState.WrongSite) {
        this.wrongSite(this.canvas);
    }else if (this.gameState == GameState.GoodSite) {
        this.goodSite(this.canvas);
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
                if(this.gameObjects[index].getName() === `Website-1` || this.gameObjects[index].getName() === `Website-2`){
                    // this.openLaptop();
                    this.gameState = GameState.WrongSite
                }
                if(this.gameObjects[index].getName() === `Website-4`){
                    // this.openLaptop();
                    this.gameState = GameState.GoodSite
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

    private setBackgroundWrogSite() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = `url(./assets/img/Laptopscherm.png)`;
    }

    private setBackgroundGoodSite() {
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
        this.gameObjects.push(new Website(`Website-1`, `./assets/img/chat-1.png`,100, 90));
        this.gameObjects.push(new Website(`Website-2`, `./assets/img/NigerianScamEmail-1.png`,1170, 90));
        this.gameObjects.push(new Website(`Website-3`, `./assets/img/the_nigerian_prince_scam.png`,100, 480));
        this.gameObjects.push(new Website(`Website-4`, `./assets/img/whatsapp-berichtje.png`,770, 90));
        this.gameObjects.push(new Website(`Website-5`, `./assets/img/whatsapp.png`,1170, 480));
        for (let index = 2; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `32px Calibri`;
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`Welke foto is geen voorbeeld van catfishing `, 700, 38);

    }
    public wrongSite(canvas:HTMLCanvasElement){
        console.log("error");
        this.setBackgroundWrogSite
    }
    public goodSite(canvas:HTMLCanvasElement){
        console.log("verry nice");
        this.setBackgroundGoodSite
    }
}