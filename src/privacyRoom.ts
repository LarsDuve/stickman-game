/**
 * information
 * coords for laptop - x:1152 y:507
 */


class PrivacyRoom {


    // The canvas
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gameObjects: GameObjects[];
    private gameState: string;
    

    public constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        // create canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.gameObjects = [];
        this.mouseListener();
// everything after this needs to stack in proper order, otherwise pictures will be hidden.  
        this.loop();
    }
    /**
   * Method for the Game Loop
   * Based on the game state some actions have to be executed
   */
  private loop = () => {
    console.log(this.gameObjects);


    
    
    if (this.gameState === "laptopState"){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      console.log("gamestate changed");
      this.laptopState();
      
      
    }
    else if (this.gameState = "beginState"){
      // setBackgroundPrivacy must be first, it's the background.
      this.setBackgroundPrivacy();
      this.beginState();
    

    }
    
    
   
      
    requestAnimationFrame(this.loop);
  };
  private laptopState(){
    if (this.gameState === "laptopState"){
    this.gameObjects.shift();
    this.gameObjects.push(new LaptopScreen(200,50,1300,920));
    this.gameObjects.shift();
    this.gameObjects.push(new houseNumber(350,200,800,600));
    this.draw();
    }

    
   
    

  }
  private beginState(){
    if (this.gameState === "beginState"){
   this.gameObjects.shift();
   this.gameObjects.shift();
    this.gameObjects.push(new Laptop(850,290,250,200));
    this.gameObjects.push(new CreepyMan(425,200,100,200));
    this.draw();
  }
}
     /**
     * Method to draw to the canvas
     */
    private draw() {
              //draws the objects
              for (let i = 0; i < this.gameObjects.length; i++) {
                this.gameObjects[i].draw(this.ctx);
  }
 
}
  private setBackgroundPrivacy() {
    
   // Start listening to resize events and draw canvas.
   this.initialize();
  }

   private initialize() {
       // Register an event listener to call the resizeCanvas() function 
       // each time the window is resized.
       window.addEventListener('resize', this.resizeCanvas, false);
       // Draw canvas border for the first time.
       this.resizeCanvas();
    }

    // Display custom canvas. In this case it's a blue, 5 pixel 
    // border that resizes along with the browser window.
    private redraw() {
       const img: HTMLImageElement = new Image();
       img.src = "./assets/pictures/backgroundPrivacy.png";
       this.ctx.drawImage(img,0,0)
       this.ctx.strokeStyle = 'blue';
       this.ctx.lineWidth = 5;
       this.ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    }

    // Runs each time the DOM window resize event fires.
    // Resets the canvas dimensions to match window,
    // then draws the new borders accordingly.
    private resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.redraw();
    }
    /**
     * gets the mouse position on the canvas.
     * 
     * @param canvas HTMLCanvasElement 
     * @param event 
     */
    private getMousePosition(event:MouseEvent) { 
      let rect = this.canvas.getBoundingClientRect(); 
      let x = event.clientX - rect.left; 
      let y = event.clientY - rect.top; 
      console.log(`Coordinate x: ${x}, Coordinate y: ${y}`); 

      for (let i=0; i < this.gameObjects.length; i++){
      if (
        event.clientX >= this.gameObjects[i].xPos &&
        event.clientX < this.gameObjects[i].xPos + this.gameObjects[i].imageWidth &&
        event.clientY >= this.gameObjects[i].yPos &&
        event.clientY <= this.gameObjects[i].yPos + this.gameObjects[i].imageWidth
    ) {
        if (this.gameObjects[i].name == "Laptop") {
            console.log("laptop geklikt");
            this.gameState = "laptopState"
            console.log(this.gameState);
        } 
    }
  } 
}
  /**
   * when mouse is clicked, get the mouse position of @function getMousePosition
   */
  private mouseListener(){

  this.canvas.addEventListener("mousedown", (e) => 
  { 
      this.getMousePosition(e); 
      
  }); 
}


      /**
   * Method to load an image
   * @param {HTMLImageElement} source
   * @return HTMLImageElement - returns an image
   */
  public static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
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