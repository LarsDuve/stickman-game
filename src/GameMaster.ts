class GameMaster {
    private gameObjects: GameObjects[];
    private garage: Garage;
    private gameState: string;
    private counterForClicks: number;
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

        this.gameObjects = [];

        this.counterForClicks = 0;
        this.score = 0;


        // create canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;    	

        this.gameState = "levelSelect";
        

        window.addEventListener("keypress", this.keyPress);
        document.addEventListener("click", this.clickHandler);

        this.loop();
    }

    private loop = () => {
    //   console.log(this.counterForClicks);
         //a loop that removes the first index of an array, don't adjust.
    if (this.gameState === "levelSelect" || this.gameState ==="garage" || this.gameState ==="catfish" || this.gameState === "privacy" || this.gameState === "password"){
           //a loop that removes the first index of an array, don't adjust.
    for (let i=-100; i<this.gameObjects.length; i++){
        this.gameObjects.shift();
      }
    }

    if (this.gameState === "levelSelect") {
        this.levelSelector();         
    }
    if (this.gameState === "garage") {
        this.initiateGarageLevel();
    }
    if (this.gameState === `catfish`) {
        this.initiateKitchenLevel();
    }
    if (this.gameState ==="password") {
        if (this.roomState === "passwordInProgress") {
            this.initiatePasswordLevel();

        } else {
            this.roomState === "passwordBeginState";
        }

    }
    if (this.gameState === "privacy") {
        this.initiatePrivacyLevel();
        
        
    }
    // console.log(this.gameObjects);
      
      
        this.draw();
        this.move(this.canvas);
        this.checkScore();
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

                console.log(`clicked ${this.gameObjects[i].getName()}`)
                if (this.gameObjects[i].clickObjectState === "unclicked") {
                    if (this.gameObjects[i].getName()=== "diningRoomTopPicture"){
                        this.gameState = "password"
                    }
                    if (this.gameObjects[i].getName()=== "livingRoomTopPicture"){
                        this.gameState = "privacy"
                    }
                    if (this.gameObjects[i].getName()=== "kitchenTopPicture"){
                        this.gameState = "catfish"
                    }
                    if (this.gameObjects[i].getName()=== "garageTopPicture"){
                        this.gameState = "garage"
                        
                    }
                
                    // Password Room -------------------------------------------------------
                    //if (this.gameState === "passwordInProgress") {
                        if (this.gameObjects[i].getName() === "laptop-password") {
                            this.roomState = "passwordLaptopState";

                        } 
                        else if (this.gameObjects[i].getName() === "xbutton") {
                            this.roomState = "passwordEndState";

                        } 
                        else if (this.gameObjects[i].getName() === "arrowbutton") {
                            if (this.passwordInput.join("") === this.password.join("")) {
                                this.roomState = "passwordFinalState";
                            }
                            
                        } 
                        else if (this.roomState === "passwordEndState") {
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
    
                            } else if (this.gameObjects[i].getName() === "password-note") {
                                this.gameObjects.push(new PasswordNoteZoom(521, 95));
    
                            } 
                            else if (this.gameObjects[i].getName() === "password-note-zoom") {
                                this.gameObjects.pop();
                            }

                        //} 
                        
                    }
                    // ------------------------------------ password Room

                    // scam room ---------------------------------------------------------
                    if (this.gameState === `GarageInProgress`) {
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
                    }
                    // ---------------------------------------------------------scam room
                    

                    // Privacy Room ------------------------------------------------------------
                    if (this.gameState === "privacyInProgress"){
                        if (this.gameObjects[i].getName() === "blindsClickerPicture"){
                            console.log("blinds geklikt")
                            this.gameState = "privacyBlindsUpBeginState";
                            

                        }
                        if (this.gameState === "wrongUploadState" && this.gameObjects[i].getName() === "blindsClickerPicture"){
                          console.log("blinds geklikt")
                          this.gameState = "privacyBlindsUpWrongState";
                          

                        }
                        if (this.gameObjects[i].getName() == "Laptop") {
                            console.log("laptop geklikt");
                            this.gameState = "privacyLaptopState";
                           

                        } 
                        if(this.gameObjects[i].getName() == "nextPicture") {
                          // for every click on the next button, do countNextClicks + 1
                      
                      
                      this.counterForClicks += 1;
                      console.log("Next geklikt");
                        this.gameState = "privacyNextPictureState";
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
                      this.gameState = "privacyWrongUploadState";                
                    }
                }

                    // ------------------------------------------------------ Privacy Room

                // Catfish Room ------------------------------------------
                if (this.gameState === `catfish`) {
                    if(this.gameObjects[i].getName() === `laptop`){
                        this.gameState = "LaptopCatfish"
                        this.laptop(this.canvas);
                    }
                    // if(this.gameObjects[i].getName() === `Website-1`){  
                    //     this.gameState = "WrongSite"
                    //     this.wrongSite(this.canvas);
                    // }
                    if(this.gameObjects[i].getName() === `Website-2`){
                        this.gameState = "WrongSite"
                        this.wrongSite(this.canvas);
                    }
                    if(this.gameObjects[i].getName() === `Website-4`){
                        this.gameState = "GoodSite"
                        this.goodSite(this.canvas);
                    }
                    if(this.gameObjects[i].getName() === `refresh`){
                        this.gameState = "WrongSiteEnd"
                        this.wrongSiteEnd(this.canvas);
                    }
                    if(this.gameObjects[i].getName() === `refresh-2`){
                        this.gameState = "GoodSiteEnd"
                        this.goodSiteEnd(this.canvas);
                    }
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
        //if (this.roomState === "passwordLaptopState") {
            this.drawPasswordInput(this.ctx, this.canvas);
        //}
    }
    
    private drawPasswordInput(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "black";
        ctx.fillText(this.passwordInput.join(""), 616, 468);
    }


    // private drawPasswordInput(ctx: CanvasRenderingContext2D) {
    //     for (let i = 0; i < this.password.length; i++) {
    //         this.writeTextToCanvas(
    //             ctx,
    //             this.passwordInput.join(""),
    //             25,
    //             616,
    //             468
    //         );
    //     }
    // }

    private drawPasswordQuest(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "red";
        ctx.fillText(`Look around the room for your password`, canvas.width / 2, 40);
    }
    

// private startScreen() {
//     this.gameObjects.push(new)
// }


private initiatePrivacyLevel() {
    
        // a loop that removes the first index of an array, don't adjust.

        console.log(this.gameState);
        if (this.gameState === "privacy") {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // setBackgroundPrivacy must be first, it's the background.
            this.beginState();
          }
        
        else if (this.gameState === "privacyLaptopState"){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          console.log("gamestate changed");
          this.laptopState();
          
        }
        else if(this.gameState === "privacyNextPictureState"){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.nextPictureState();
        }
        else if (this.gameState === "privacyWrongUploadState"){ 
             this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        
        // setBackgroundPrivacy must be first, it's the background.
        
        this.wrongUploadState();
        
        }
        else if (this.gameState === "privacyBlindsUpBeginState"){
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
         // setBackgroundPrivacy must be first, it's the background.
         
          this.blindsUpBeginState();
        }
        else if (this.gameState === "privacyBlindsUpWrongState"){
           this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
         // setBackgroundPrivacy must be first, it's the background.
         
          this.blindsUpWrongState();
        }
    
        
        
        console.log(this.gameObjects);
}



private initiatePasswordLevel() {
    console.log(this.gameState);
    console.log(this.gameObjects);
    console.log(this.roomState);
    if (this.roomState === "passwordBeginState") {
        this.keyListener = new KeyListener();
        this.passwordInput = [];
        this.password = ["a","b","c","1","2","3"];

        this.gameObjects.push(new PasswordbackgroundRoom(0, 0));
        this.gameObjects.push(new Table(380, 270));
        this.gameObjects.push(new LaptopPassword(650, 280));
        this.gameObjects.push(new CharacterSitting(543, 300));
        this.gameObjects.push(new Trashcan(780 ,500));
        this.gameObjects.push(new Painting(360, 65));
        this.gameObjects.push(new Plant(1220, 340));
        this.drawPassword();

    } else if (this.roomState === "passwordLaptopState") {
        this.gameObjects.push(new PasswordbackgroundLaptop(0, 0));
        this.gameObjects.push(new XButton(1400, 80));
        this.gameObjects.push(new ArrowButton(887, 447));
        this.drawPassword();
        console.log('test');

    } else if (this.roomState === "passwordEndState") {    
        this.gameObjects.push(new PasswordbackgroundRoom(0, 0));
        this.gameObjects.push(new Table(380, 270));
        this.gameObjects.push(new LaptopPassword(650, 280));
        this.gameObjects.push(new Chair(390, 350));
        this.gameObjects.push(new CharacterPassword(540, 300));
        this.gameObjects.push(new Trashcan(780, 500));
        this.gameObjects.push(new Painting(360, 65));
        this.gameObjects.push(new Plant(1220, 340));
        this.drawPassword();
        this.drawPasswordQuest(this.ctx, this.canvas);
        

    } //else if (this.roomState === "passwordFinalState") {    
      //  document.body.style.backgroundImage = `url(./assets/imgPassword/livingroom-empty.png)`    
        
    //}

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
    private levelSelector(){
        this.gameObjects.push(new houseLevelSelector(0,-20,1620,800))
        this.gameObjects.push(new kitchenTop(960,88,220,93));
        this.gameObjects.push(new livingRoomTop(370,389,107,200));
        this.gameObjects.push(new DiningRoomTop(400,77,217,110));
        this.gameObjects.push(new garageTop(1056,440,113,187));
        
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
        
    }
    private laptopState() {
        this.gameObjects.push(new LaptopScreenPrivacy(200, 50, 1300, 920));
        this.gameObjects.push(new houseNumber(350, 200, 800, 600));
        this.gameObjects.push(new nextPicture(1200, 600, 200, 150));
        this.gameObjects.push(new backPicture(1200, 750, 200, 150));
        this.gameObjects.push(new uploadPicture(1200, 350, 200, 150));
       
    }


    private beginState() {
        this.gameObjects.push(new privacyBackground(0,0,1620,800));
        this.gameObjects.push(new blindsClickerPicture(640, 40, 50, 300));
        this.gameObjects.push(new Laptop(850, 230, 200, 200));
        this.gameObjects.push(new blindsPicture(355, 40, 290, 330));

       
    }
    private blindsUpBeginState() {
        this.gameObjects.push(new Laptop(850, 290, 250, 200));
        this.gameObjects.push(new blindsUpPicture(320, 22, 300, 300));
        this.gameObjects.push(new blindsClickerPicture(600, 50, 50, 300));
        

    }
    private wrongUploadState() {
        this.gameObjects.push(new Laptop(850, 290, 250, 200));
        this.gameObjects.push(new CreepyMan(400, 50, 200, 350));
        this.gameObjects.push(new blindsClickerPicture(600, 250, 50, -300));
        this.gameObjects.push(new blindsPicture(330, 40, 290, 370));
    

    
    }

    private blindsUpWrongState() {
        this.gameObjects.push(new Laptop(850, 290, 50, 50));
        this.gameObjects.push(new CreepyMan(400, 50, 200, 350));
        this.gameObjects.push(new blindsUpPicture(320, 22, 300, 300));
        this.gameObjects.push(new blindsClickerPicture(600, 50, 50, 300));
    }

    // Scam room //
    private initiateGarageLevel() {
        this.gameState = `GarageInProgress`;
        this.gameObjects.push(new GarageLightsOff(0,0,1920,970), new LightSwitch(250, 150));
        this.numberOfLinks = 4;
        this.score = 0;
    }

    private drawGameover(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "red";
        ctx.fillText(`You clicked a bad link!`, 500, 40);
    }

    /**
     * draws the win text
     */
    private drawWin(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "green";
        ctx.fillText(`You clicked all the right links! Score: ${this.score}`, 500, 40);
    }

    /**
     * draws the start text
     */
    private drawStart(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "black";
        ctx.fillText(`Click all the right links! Score: ${this.score}`, 500, 40);
    }

    /**
     * checks how many right links the player has clicked
     */
    private checkScore() {
        if (this.score == this.numberOfLinks) {
            this.roomState = `scamWin`;
            this.gameObjects.splice(0, this.gameObjects.length);
            this.turnOnLights();
        }
    }
        
    /**
     * function for when the player clicks the lightswitch
     */
        private handleLightSwitch() {
            this.turnOnLights();
        }
    
        /**
         * function for when the player clicks the chug jug
         */
        private handleChugJug() {
            this.chugJug();
        }
    
        /**
         * function for when the player clicks the laptop
         */
        private handleLaptop(i: number) {
            this.gameObjects.splice(i, 1);
            this.startGame();
            this.roomState = `scamStart`;
        }
    
        /**
         * function for when the player clicks a good link
         */
        private handleGoodLink(i: number) {
            this.gameObjects.splice(i, 1);
            this.score++;
        }
    
        /**
         * function for when the player clicks a bad link
         */
        private handleBadLink() {
            this.roomState = `scamGameOver`;
            this.gameObjects.splice(0, this.gameObjects.length);
            this.turnOnLights();
            this.score = 0;
        }
    
        /**
         * turns on the ligths in the garage
         */
        private turnOnLights() {
            this.gameObjects.push(new GarageLightsOn(0,0,1920,970), new LaptopPrivacy(850, 100), new Character(500, 200));
        }
    
        /**
         * spawns a chugjug
         */
        private chugJug() {
            this.gameObjects.push(new ChugJug(400, 300));
        }
    
        /**
         * starts the garage game
         */
        private startGame() {
            this.roomState = `start`;
            for (let i = 1; i < this.numberOfLinks + 1; i++) {
                this.gameObjects.push(new GoodLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
                this.gameObjects.push(new BadLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
            }
        }
    


    
    // Scam room // 
    
    // catfish------------------------------
    
    private initiateKitchenLevel() {
        this.setBackgroundCatfish();
        this.gameObjects.push(new LaptopCatfish(450, 600), new CharacterCatfish(1600, 620));
    }

    private setBackgroundCatfish() {
        document.body.style.backgroundImage = `url(./assets/imgCatfish/keuken.png)`;
    }

    private setBackgroundLaptop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = `url(./assets/imgCatfish/Laptopscherm.png)`;
    }
    
    private setBackgroundSite() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.style.backgroundImage = `url(./assets/imgCatfish/Laptopscherm.png)`;
    }
    private laptop(canvas:HTMLCanvasElement){
        for (let i = -100; i < this.gameObjects.length; i++) {
        this.gameObjects.shift();
        }
        this.setBackgroundLaptop();
        this.gameObjects.push(new Website(`Website-1`, `./assets/imgCatfish/chat-1.png`,100, 90));
        this.gameObjects.push(new Website(`Website-2`, `./assets/imgCatfish/NigerianScamEmail-1.png`,1170, 90));
        this.gameObjects.push(new Website(`Website-3`, `./assets/imgCatfish/the_nigerian_prince_scam.png`,100, 480));
        this.gameObjects.push(new Website(`Website-4`, `./assets/imgCatfish/whatsapp-berichtje.png`,770, 90));
        this.gameObjects.push(new Website(`Website-5`, `./assets/imgCatfish/whatsapp.png`,1170, 480));
        // for (let index = 0; index < this.gameObjects.length; index++) {
        //     this.gameObjects[index].draw(canvas);
        // }
        this.ctx.font = `32px Calibri`;
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`Welke foto is geen voorbeeld van catfishing `, 700, 38);
    }
    private wrongSite(canvas:HTMLCanvasElement){
        console.log("error");
        // for (let i = -100; i < this.gameObjects.length; i++) {
        //     this.gameObjects.shift();
        // }
        this.setBackgroundSite
        this.gameObjects.push(new Website(`bankrekening`, `./assets/img/bankrekening.png`,54, 44));
        this.gameObjects.push(new Website(`refresh`, `./assets/img/refresh.png`,270, 44));
        // for (let index = 0; index < this.gameObjects.length; index++) {
        //     this.gameObjects[index].draw(canvas);
        // }
        this.ctx.font = `102px Calibri`;
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Refresh de site `, 680, 120);
    }
    private wrongSiteEnd(canvas:HTMLCanvasElement){
        console.log("verry nice");
        this.setBackgroundSite
        // for (let i = -100; i < this.gameObjects.length; i++) {
        //     this.gameObjects.shift();
        // }
        this.setBackgroundSite
        this.gameObjects.push(new Website(`blut`, `./assets/img/blut.png`,54, 44));
        // for (let index = 0; index < this.gameObjects.length; index++) {
        //     this.gameObjects[index].draw(canvas);
        // }
    }

    private goodSite(canvas:HTMLCanvasElement){
        console.log("verry nice");
        this.setBackgroundSite
        // for (let i = -100; i < this.gameObjects.length; i++) {
        //     this.gameObjects.shift();
        // }
        this.setBackgroundSite
        this.gameObjects.push(new Website(`bankrekening`, `./assets/imgCatfish/bankrekening.png`,54, 44));
        this.gameObjects.push(new Website(`refresh-2`, `./assets/imgCatfish/refresh-2.png`,270, 44));
        // for (let index = 0; index < this.gameObjects.length; index++) {
        //     this.gameObjects[index].draw(canvas);
        // }
        this.ctx.font = `102px Calibri`;
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Refresh de site `, 680, 120);
    }
    private goodSiteEnd(canvas:HTMLCanvasElement){
        console.log("verry nice");
        this.setBackgroundSite
        // for (let i = -100; i < this.gameObjects.length; i++) {
        //     this.gameObjects.shift();
        // }
        this.setBackgroundSite
        this.gameObjects.push(new Website(`rijk`, `./assets/imgCatfish/rijk.png`,54, 44));
        // for (let index = 0; index < this.gameObjects.length; index++) {
        //     this.gameObjects[index].draw(canvas);
        // }
    }
    // ---------------------------------------Catfish
    /**
   * Method to draw to the canvas
   */
    private draw() {
        //draws the objects
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.canvas);
        }
        if (this.roomState === `scamStart`) {
            this.drawStart(this.ctx, this.canvas);
        }

        if (this.roomState === `scamWin`) {
            this.drawWin(this.ctx, this.canvas);
        }

        if (this.roomState === `scamGameOver`) {
            this.drawGameover(this.ctx, this.canvas);
        }
    }
    
    private drawPassword() {
        //draws the objects
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.canvas);
        }
    }

    private move(canvas: HTMLCanvasElement) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].move(canvas);
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