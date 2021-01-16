class GameMaster {
    private gameObjects: GameObjects[];
    private garage: Garage;
    private gameState: string;
    private counterForClicks: number;
    private laptopscreen: LaptopScreen;
    private score: number;
    private numberOfLinks: number;
    private keyListener: KeyListener;
    private ctx: CanvasRenderingContext2D;
    private roomState: string;
    private password: string[];
    private passwordInput: string[];


    


    // The canvas
    private canvas: HTMLCanvasElement;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.counterForClicks = 0;

        // create canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.garage = new Garage(this.canvas);
        this.gameObjects.push(new LightSwitch(250, 150));
        this.numberOfLinks = 3;
        this.score = 0;


        window.addEventListener("keypress", this.keyPress);
        document.addEventListener("click", this.clickHandler);

        this.loop();
    }

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
    
        else {this.gameState = "StartScreen";
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          // setBackgroundPrivacy must be first, it's the background.
          this.setBackgroundPrivacy();
          this.beginState();
        }
        
      console.log(this.counterForClicks);

        this.garage.draw(this.canvas);
        this.garage.move(this.canvas);
        this.garage.checkScore();

        requestAnimationFrame(this.loop);
    };
    

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

                // Password Room -------------------------------------------------------
                console.log(`clicked ${this.gameObjects[i].getName()}`)
                if (this.gameObjects[i].clickObjectState === "unclicked") {
                    console.log(`clicked ${this.gameObjects[i].getName()}`);

                    if (this.gameObjects[i].getName() === "trashcan") {
                        this.gameObjects[i].move(this.canvas);
                        this.gameObjects.push(new Trash(808, 550));
                        this.gameObjects[i].clickObjectState = "clicked";
                        
                    } 
                    else if (this.gameObjects[i].getName() === "painting") {
                        this.gameObjects[i].move(this.canvas);
                        this.gameObjects[i].clickObjectState = "clicked";
                        this.gameObjects.push(new PasswordNote(380, 95));

                    }
                     else if (this.gameObjects[i].getName() === "plant") {
                        this.gameObjects[i].move(this.canvas);
                        this.gameObjects[i].clickObjectState = "clicked";
                        this.gameObjects.push(new Leaf(1330, 620));

                    } 
                    else if (this.gameObjects[i].getName() === "password-note") {
                        this.gameObjects.push(new PasswordNoteZoom(521, 95));

                    } 
                    else if (this.gameObjects[i].getName() === "password-note-zoom") {
                        this.gameObjects.pop();

                    } 
                    else if (this.gameObjects[i].getName() === "laptop") {
                        this.laptopscreen = new LaptopScreen(this.canvas);
                        this.gameObjects = [];
                        this.gameObjects.pop();
                    }
                    // ------------------------------------ password Room

                // scam room ---------------------------------------------------------
                    if (this.gameObjects[i].getName() == `lightswitch`) {
                        this.handleLightSwitch();
                    }
                    else if (this.gameObjects[i].getName() == `character`) {
                        this.handleChugJug();
                    }                
                    else if (this.gameObjects[i].getName() == 'laptop') {
                        this.handleLaptop(i);
                    }
                    else if (this.gameObjects[i].getName() == `goodlink`) {
                        this.handleGoodLink(i);
                    }
                    else if (this.gameObjects[i].getName() == `badlink`) {
                        this.handleBadLink();
                    }
                    // ---------------------------------------------------------scam room
                    

                // Privacy Room ------------------------------------------------------------

                    if (this.roomState === "beginState" && this.gameObjects[i].getName() === "blindsClickerPicture"){
                        console.log("blinds geklikt")
                        this.roomState = "blindsUpBeginState";
                        console.log(this.roomState);

                    }
                    if (this.roomState === "wrongUploadState" && this.gameObjects[i].getName() === "blindsClickerPicture"){
                      console.log("blinds geklikt")
                      this.roomState = "blindsUpWrongState";
                      console.log(this.roomState);

                  }
                    if (this.gameObjects[i].getName() == "Laptop") {
                        console.log("laptop geklikt");
                        this.roomState = "laptopState";
                        console.log(this.roomState);

                    } 
                    if(this.gameObjects[i].getName() == "nextPicture") {
                      // for every click on the next button, do countNextClicks + 1
                      
                      
                      this.counterForClicks += 1;
                      console.log("Next geklikt");
                        this.roomState = "nextPictureState";
                        console.log(this.roomState)
                        
                        
                        if (this.counterForClicks === 3){
                          this.counterForClicks = 2;
            
                        }
                        console.log(this.counterForClicks);
                        
                    }
                    if (this.gameObjects[i].getName() == "backPicture") {
                      this.counterForClicks -= 1;
                      
                      if (this.counterForClicks === -1) {
                        this.counterForClicks = 0;
                      }
                      console.log(this.counterForClicks);
            
                    }
                    if (this.gameObjects[i].getName() == "uploadPicture" && (this.counterForClicks === 0 || this.counterForClicks === 2)){
                      console.log("Upload geklikt");
                      this.roomState = "wrongUploadState";                
                    }

                    // ------------------------------------------------------ Privacy Room

                // Catfish Room ------------------------------------------
                    if(this.gameObjects[i].getName() === `laptop`){
                        // this.openLaptop();
                        this.roomState = "LaptopCatfish"
                    }
                    if(this.gameObjects[i].getName() === `Website-1` || this.gameObjects[i].getName() === `Website-2`){
                        // this.openLaptop();
                        this.roomState = "WrongSite"
                    }
                    if(this.gameObjects[i].getName() === `Website-4`){
                        // this.openLaptop();
                        this.roomState = "GoodSite"
                    }
                    if(this.gameObjects[i].getName() === `refresh`){
                        // this.openLaptop();
                        this.roomState = "WrongSiteEnd"
                    }
                    if(this.gameObjects[i].getName() === `refresh-2`){
                        // this.openLaptop();
                        this.roomState = "GoodSiteEnd"
                    }
                    // ------------------------------------- Catfish Room
                    
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
            indexes.push(i);
            }
        }
        console.log(this.passwordInput);
    }

// private startScreen() {
//     this.gameObjects.push(new)
// }







    private loadPasswordObjects() {

        if (this.roomState === "loadPasswordRoom") {
            this.passwordInput = [];
            this.password = ["a","b","c","1","2","3"];
            this.keyListener = new KeyListener();

            document.body.style.backgroundImage = `url(./assets/imgPassword/livingroom-empty.png)`
            this.gameObjects.push(new Table(380, 270));
            this.gameObjects.push(new LaptopPassword(650, 280));
            this.gameObjects.push(new CharacterSitting(543, 300));
            this.gameObjects.push(new Trashcan(780 ,500));
            this.gameObjects.push(new Painting(360, 65));
            this.gameObjects.push(new Plant(1220, 340));
            this.roomState = "passwordBeginState";

        } else if (this.roomState === "clickedPasswordLaptop") {
            document.body.style.backgroundImage = `url(./assets/imgPassword/laptopscreen.png)`
            this.gameObjects.push(new XButton(1400 ,80));
            this.gameObjects.push(new ArrowButton(879, 439));
            this.roomState = "passwordLaptopState";    

        } else if (this.roomState === "passwordSearch") {    
            document.body.style.backgroundImage = `url(./assets/imgPassword/livingroom-empty.png)`    
            this.gameObjects.push(new Table(380, 270));
            this.gameObjects.push(new LaptopPassword(650, 280));
            this.gameObjects.push(new Chair(390, 350));
            this.gameObjects.push(new CharacterPassword(540, 300));
            this.gameObjects.push(new Trashcan(780, 500));
            this.gameObjects.push(new Painting(360, 65));
            this.gameObjects.push(new Plant(1220, 340));
            this.roomState = "passwordGameState";
        }

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
            img.src = "./assets/imgPrivacy/backgroundPrivacy.png";
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

    private nextPictureState() {
        this.gameObjects.push(new LaptopScreenPrivacy(200, 50, 1300, 920));
        if (this.counterForClicks === 0) {
            this.gameObjects.push(new houseNumber(350, 200, 800, 600));
        }
        else if (this.counterForClicks === 1) {

            this.gameObjects.push(new personBirthday(350, 200, 800, 600));
            this.gameObjects.push(new backPicture(1200, 750, 200, 150));
        }
        else if (this.counterForClicks === 2) {
            this.gameObjects.push(new personID(350, 200, 800, 600));
            this.gameObjects.push(new backPicture(1200, 750, 200, 150));
        }

        this.gameObjects.push(new nextPicture(1200, 600, 200, 150));
        this.gameObjects.push(new uploadPicture(1200, 350, 200, 150));
        this.draw();
    }
    private laptopState() {
        this.gameObjects.push(new LaptopScreenPrivacy(200, 50, 1300, 920));
        this.gameObjects.push(new houseNumber(350, 200, 800, 600));
        this.gameObjects.push(new nextPicture(1200, 600, 200, 150));
        this.gameObjects.push(new backPicture(1200, 750, 200, 150));
        this.gameObjects.push(new uploadPicture(1200, 350, 200, 150));
        this.draw();
    }


    private beginState() {
        this.gameObjects.push(new blindsClickerPicture(600, 250, 50, -300));
        this.gameObjects.push(new Laptop(850, 290, 250, 200));
        this.gameObjects.push(new blindsPicture(330, 40, 290, 370));

        this.draw();
    }
    private blindsUpBeginState() {
        this.gameObjects.push(new Laptop(850, 290, 250, 200));
        this.gameObjects.push(new blindsUpPicture(320, 22, 300, 300));
        this.gameObjects.push(new blindsClickerPicture(600, 50, 50, 300));
        this.draw();


    }
    private wrongUploadState() {
        this.gameObjects.push(new Laptop(850, 290, 250, 200));
        this.gameObjects.push(new CreepyMan(400, 50, 200, 350));
        this.gameObjects.push(new blindsClickerPicture(600, 250, 50, -300));
        this.gameObjects.push(new blindsPicture(330, 40, 290, 370));
        this.draw();

    }
    private blindsUpWrongState() {
        this.gameObjects.push(new Laptop(850, 290, 250, 200));
        this.gameObjects.push(new CreepyMan(400, 50, 200, 350));
        this.gameObjects.push(new blindsUpPicture(320, 22, 300, 300));
        this.gameObjects.push(new blindsClickerPicture(600, 50, 50, 300));
        this.draw();
    }

    // Scam room //
    private drawGameover(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "red";
        ctx.fillText(`You clicked a bad link!`, canvas.width / 2, 40);
    }

    private drawWin(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "green";
        ctx.fillText(`You clicked all the right links! Score: ${this.score}`, canvas.width / 2, 40);
    }

    private drawStart(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "black";
        ctx.fillText(`Click all the right links! Score: ${this.score}`, canvas.width / 2, 40);
    }

    public checkScore() {
        if (this.score == this.numberOfLinks) {
            this.roomState = `win`;
            this.gameObjects.splice(0, this.gameObjects.length);
            this.turnOnLights();
        }
    }
        
        private handleLightSwitch() {
            this.turnOnLights();
        }
    
        private handleChugJug() {
            this.chugJug();
        }
    
        private handleLaptop(i: number) {
            this.gameObjects.splice(i, 1);
            this.startGame();
        }
    
        private handleGoodLink(i: number) {
            console.log(`test`);
            this.gameObjects.splice(i, 1);
            this.score++;
        }
    
        private handleBadLink() {
            console.log(`test2`);
            this.roomState = `scamGameOver`;
            this.gameObjects.splice(0, this.gameObjects.length);
            this.turnOnLights();
            this.score = 0;
        }
    
        private setBackgroundScam() {
            document.body.style.backgroundImage = `url(./assets/img/garageLightsOut.png)`;
        }
    
        private turnOnLights() {
            document.body.style.backgroundImage = `url(./assets/img/garageLightsOn.png)`;
            this.gameObjects.push(new LaptopCatfish(850, 100), new Character(500, 200));
        }
    
        private chugJug() {
            this.gameObjects.push(new ChugJug(400, 300));
        }
    
        private startGame() {
            this.roomState = `start`;
            for (let i = 1; i < this.numberOfLinks + 1; i++) {
                this.gameObjects.push(new GoodLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
                this.gameObjects.push(new BadLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
            }
        }
    

    // Scam room // 
    
    // catfish------------------------------
    private setBackgroundCatfish() {
        document.body.style.backgroundImage = `url(./assets/img/keuken.png)`;
    }

    private setBackgroundLaptop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = `url(./assets/img/Laptopscherm.png)`;
    }
    
    private setBackgroundSite() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = `url(./assets/img/Laptopscherm.png)`;
    }
    private laptop(canvas:HTMLCanvasElement){
        // this.status = `open` waarschijnlijk niet nodig
        for (let i = -100; i < this.gameObjects.length; i++) {
        this.gameObjects.shift();
        }
        this.setBackgroundLaptop();
        this.gameObjects.push(new Website(`Website-1`, `./assets/img/chat-1.png`,100, 90));
        this.gameObjects.push(new Website(`Website-2`, `./assets/img/NigerianScamEmail-1.png`,1170, 90));
        this.gameObjects.push(new Website(`Website-3`, `./assets/img/the_nigerian_prince_scam.png`,100, 480));
        this.gameObjects.push(new Website(`Website-4`, `./assets/img/whatsapp-berichtje.png`,770, 90));
        this.gameObjects.push(new Website(`Website-5`, `./assets/img/whatsapp.png`,1170, 480));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `32px Calibri`;
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`Welke foto is geen voorbeeld van catfishing `, 700, 38);

    }
    private wrongSite(canvas:HTMLCanvasElement){
        console.log("error");
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundSite
        this.gameObjects.push(new Website(`bankrekening`, `./assets/img/bankrekening.png`,54, 44));
        this.gameObjects.push(new Website(`refresh`, `./assets/img/refresh.png`,270, 44));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `102px Calibri`;
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Refresh de site `, 680, 120);
    }
    private wrongSiteEnd(canvas:HTMLCanvasElement){
        console.log("verry nice");
        this.setBackgroundSite
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundSite
        this.gameObjects.push(new Website(`blut`, `./assets/img/blut.png`,54, 44));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
    }

    private goodSite(canvas:HTMLCanvasElement){
        console.log("verry nice");
        this.setBackgroundSite
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundSite
        this.gameObjects.push(new Website(`bankrekening`, `./assets/img/bankrekening.png`,54, 44));
        this.gameObjects.push(new Website(`refresh-2`, `./assets/img/refresh-2.png`,270, 44));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `102px Calibri`;
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Refresh de site `, 680, 120);
    }
    private goodSiteEnd(canvas:HTMLCanvasElement){
        console.log("verry nice");
        this.setBackgroundSite
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.setBackgroundSite
        this.gameObjects.push(new Website(`rijk`, `./assets/img/rijk.png`,54, 44));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
    }
    // ---------------------------------------Catfish
    /**
   * Method to draw to the canvas
   */
    private draw() {
        //draws the objects
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.canvas);
        }
        if (this.roomState === `startScamGame`) {
            this.drawStart(this.ctx, this.canvas);
        }

        if (this.roomState === `scamWin`) {
            this.drawWin(this.ctx, this.canvas);
        }

        if (this.roomState === `scamGameOver`) {
            this.drawGameover(this.ctx, this.canvas);
        }
    }

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