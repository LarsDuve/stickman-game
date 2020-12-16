class ScamRoom {

    private gameObjects: GameObjects[];
    private links: string[];
    private status: string;

    constructor(canvas: HTMLCanvasElement) {

        this.setBackground();
        canvas.addEventListener(`click`, this.mouseHandler);

        this.gameObjects = [];

        this.gameObjects.push(new Laptop(850, 100), new Character(500, 200));

        this.links = [`www.gmail.com`, `www.gmoil.com`, `www.epicgames.com`, `www.epiicgames.com`, `www.rabobamk.nl`, `www.rabobank.nl`];

        this.status = `closed`;

    }

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
                    this.openLaptop();
                }
            }
        }
    }

    private setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/garage.png)`;
    }

    public openLaptop() {
        this.status = `open`;
    }

    public draw(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');

        for (let index = 0; index < this.gameObjects.length; index++) {
            // console.log(this.gameObjects[index].getName());
            this.gameObjects[index].draw(canvas);
        }

        if (this.status === `open`) {
            ctx.font = `32px Calibri`;
            ctx.fillStyle = "red";
            ctx.fillText(`Click all the bad links in time!`, canvas.width / 2, 40);
        }
    }

}