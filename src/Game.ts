class Game {

    // The canvas
    private canvas: HTMLCanvasElement;

    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        // Resize the canvas so it looks more like a Runner game
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;


        // // Start the animation
        // console.log('start animation');
        // requestAnimationFrame(this.step);
    }


}