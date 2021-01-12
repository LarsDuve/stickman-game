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
    private counterForClicks: number;

    public constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        // create canvas
        this.counterForClicks = 0;
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
    //a loop that removes the first index of an array, don't adjust.
    for (let i=-100; i<this.gameObjects.length; i++){
      this.gameObjects.shift();
    }
    console.log(this.gameState);
 

    
    if (this.gameState === "laptopState"){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      console.log("gamestate changed");
      this.laptopState();
      
      
    }
    else if(this.gameState === "nextPictureState"){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.nextPictureState();
    }
    else if (this.gameState === "wrongUploadState"){
      
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // setBackgroundPrivacy must be first, it's the background.
    this.setBackgroundPrivacy();
    this.wrongUploadState();
    
    }
    else if (this.gameState === "blindsUpBeginState"){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
     // setBackgroundPrivacy must be first, it's the background.
      this.setBackgroundPrivacy();
      this.blindsUpBeginState();
    }
    else if (this.gameState === "blindsUpWrongState"){
       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
     // setBackgroundPrivacy must be first, it's the background.
      this.setBackgroundPrivacy();
      this.blindsUpWrongState();
    }

    else {this.gameState = "beginState";
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // setBackgroundPrivacy must be first, it's the background.
      this.setBackgroundPrivacy();
      this.beginState();
      
      
     
  }
  console.log(this.counterForClicks);

    requestAnimationFrame(this.loop);
  };
  private nextPictureState(){
      this.gameObjects.push(new LaptopScreen(200,50,1300,920));
      if (this.counterForClicks === 0){
        this.gameObjects.push(new houseNumber(350,200,800,600));
      }
      else if (this.counterForClicks === 1){
      
      this.gameObjects.push(new personBirthday(350,200,800,600));
      this.gameObjects.push(new backPicture(1200,750,200,150));
      }
      else if (this.counterForClicks === 2){
        this.gameObjects.push(new personID(350,200,800,600));
        this.gameObjects.push(new backPicture(1200,750,200,150));
        }
     
      this.gameObjects.push(new nextPicture(1200,600,200,150));
      this.gameObjects.push(new uploadPicture(1200,350,200,150));
      this.draw();
  }
  private laptopState(){
    this.gameObjects.push(new LaptopScreen(200,50,1300,920));
    this.gameObjects.push(new houseNumber(350,200,800,600));
    this.gameObjects.push(new nextPicture(1200,600,200,150));
    this.gameObjects.push(new backPicture(1200,750,200,150));
    this.gameObjects.push(new uploadPicture(1200,350,200,150));
    this.draw();
    }
  

  private beginState(){
    this.gameObjects.push(new blindsClickerPicture(600,250,50,-300));
    this.gameObjects.push(new Laptop(850,290,250,200));
    this.gameObjects.push(new blindsPicture(330,40,290,370));
    
    this.draw();
}
private blindsUpBeginState(){
  this.gameObjects.push(new Laptop(850,290,250,200));
  this.gameObjects.push(new blindsUpPicture(320,22,300,300));
  this.gameObjects.push(new blindsClickerPicture(600,50,50,300));
  this.draw();
  
  
}
private wrongUploadState(){
  this.gameObjects.push(new Laptop(850,290,250,200));
  this.gameObjects.push(new CreepyMan(400,50,200,350));
  this.gameObjects.push(new blindsClickerPicture(600,250,50,-300));
  this.gameObjects.push(new blindsPicture(330,40,290,370));
  this.draw();

}
private blindsUpWrongState(){
  this.gameObjects.push(new Laptop(850,290,250,200));
  this.gameObjects.push(new CreepyMan(400,50,200,350));
  this.gameObjects.push(new blindsUpPicture(320,22,300,300));
  this.gameObjects.push(new blindsClickerPicture(600,50,50,300));
  this.draw();
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
      
      
      //variable amount of clicks on the next button
      

      for (let i=0; i < this.gameObjects.length; i++){
      if (
        event.clientX >= this.gameObjects[i].xPos &&
        event.clientX < this.gameObjects[i].xPos + this.gameObjects[i].imageWidth &&
        event.clientY >= this.gameObjects[i].yPos &&
        event.clientY <= this.gameObjects[i].yPos + this.gameObjects[i].imageWidth
    ) {
      console.log(this.gameObjects[i].name);
      
        if (this.gameState === "beginState" && this.gameObjects[i].name === "blindsClickerPicture"){
            console.log("blinds geklikt")
            this.gameState = "blindsUpBeginState";
            console.log(this.gameState);
        }
        if (this.gameState === "wrongUploadState" && this.gameObjects[i].name === "blindsClickerPicture"){
          console.log("blinds geklikt")
          this.gameState = "blindsUpWrongState";
          console.log(this.gameState);
      }
        if (this.gameObjects[i].name == "Laptop") {
            console.log("laptop geklikt");
            this.gameState = "laptopState";
            console.log(this.gameState);
        } 
        if(this.gameObjects[i].name == "nextPicture") {
          // for every click on the next button, do countNextClicks + 1
          
          
          this.counterForClicks += 1;
          console.log("Next geklikt");
            this.gameState = "nextPictureState";
            console.log(this.gameState)
            
            
            if (this.counterForClicks === 3){
              this.counterForClicks = 2;

            }
            console.log(this.counterForClicks);
            
        }
        if (this.gameObjects[i].name == "backPicture") {
          this.counterForClicks -= 1;
          
          if (this.counterForClicks === -1) {
            this.counterForClicks = 0;
          }
          console.log(this.counterForClicks);

        }
        if (this.gameObjects[i].name == "uploadPicture" && (this.counterForClicks === 0 || this.counterForClicks === 2)){
          console.log("Upload geklikt");
          this.gameState = "wrongUploadState";
          

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
      color: string = "black"
  ) {
      ctx.font = `${fontSize}px Minecraft`;
      ctx.fillStyle = color;
      ctx.textAlign = alignment;
      ctx.fillText(text, xCoordinate, yCoordinate);
  }


}