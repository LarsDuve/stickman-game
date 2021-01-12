class Game {

    private garage: Garage;

    // The canvas
    private canvas: HTMLCanvasElement;

    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        // create canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.garage = new Garage(this.canvas);

        this.loop();
    }

    private loop = () => {
        this.garage.draw(this.canvas);
        this.garage.move(this.canvas);
        this.garage.checkScore();

        requestAnimationFrame(this.loop);
    };

    /**
* Loads an image in such a way that the screen doesn't constantly flicker
* @param {HTMLImageElement} source
* @return HTMLImageElement - returns an image
*/
    public static loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }

    /**
   * Renders a random number between min and max
   * @param {number} min - minimal time
   * @param {number} max - maximal time
   */
    public static randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

}