class GameMaster {
    constructor(canvas) {
        this.loop = () => {
            if (this.gameState === "stickmanStartScreen") {
                this.gameObjects.push(new startScreen(0, 0, 1920, 1080));
                this.gameObjects.push(new startButton(600, 400, 400, 200));
            }
            if (this.gameState === "levelSelect" || this.gameState === "garage" || this.gameState === "catfish" || this.gameState === "privacy" || this.gameState === "password") {
                for (let i = -100; i < this.gameObjects.length; i++) {
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
            if (this.gameState === "password") {
                this.initiatePasswordLevel();
            }
            if (this.gameState === "privacy") {
                this.initiatePrivacyLevel();
                console.log(this.roomState);
            }
            this.draw();
            this.moveLinks();
            this.checkScore();
            requestAnimationFrame(this.loop);
        };
        this.clickHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            for (let i = 0; i < this.gameObjects.length; i++) {
                if (event.clientX >= this.gameObjects[i].getXPos() &&
                    event.clientX < this.gameObjects[i].getXPos() + this.gameObjects[i].getImageWidth() &&
                    event.clientY >= this.gameObjects[i].getYPos() &&
                    event.clientY <= this.gameObjects[i].getYPos() + this.gameObjects[i].getImageHeight()) {
                    console.log(`clicked ${this.gameObjects[i].getName()}`);
                    if (this.gameObjects[i].clickObjectState === "unclicked") {
                        if (this.gameObjects[i].getName() === "startButton") {
                            this.gameState = "levelSelect";
                        }
                        if (this.gameObjects[i].getName() === "diningRoomTopPicture") {
                            this.gameState = "password";
                            this.roomState = "passwordBeginState";
                        }
                        if (this.gameObjects[i].getName() === "livingRoomTopPicture") {
                            this.gameState = "privacy";
                            this.roomState = "privacyInProgress";
                        }
                        if (this.gameObjects[i].getName() === "kitchenTopPicture") {
                            this.gameState = "catfish";
                        }
                        if (this.gameObjects[i].getName() === "garageTopPicture") {
                            this.gameState = "garage";
                        }
                        if (this.gameState === "password") {
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
                            else if (this.roomState = "passwordBeginState") {
                                if (this.gameObjects[i].getName() === "trashcan") {
                                    this.roomState = "trashcanClicked";
                                }
                                else if (this.gameObjects[i].getName() === "painting") {
                                    this.roomState = "paintingClicked";
                                }
                                else if (this.gameObjects[i].getName() === "plant") {
                                    this.roomState = "plantClicked";
                                }
                                else if (this.gameObjects[i].getName() === "password-note") {
                                    this.roomState = "password-noteClicked";
                                }
                                else if (this.gameObjects[i].getName() === "password-note-zoom") {
                                    this.roomState = "password-note-zoomClicked";
                                }
                                else if (this.gameObjects[i].getName() === "yes") {
                                    this.roomState = "passwordbackgroundQuestFail";
                                    this.gameObjects.push(new PasswordbackgroundQuestWin(0, 0));
                                }
                                else if (this.gameObjects[i].getName() === "no") {
                                    this.roomState = "passwordbackgroundQuestWin";
                                    this.gameObjects.push(new PasswordbackgroundQuestFail(0, 0));
                                }
                                else if (this.gameObjects[i].getName() == `arrow`) {
                                    this.gameObjects.splice(0, this.gameObjects.length);
                                    this.gameState = `levelSelect`;
                                }
                            }
                        }
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
                            else if (this.gameObjects[i].getName() == `arrow`) {
                                this.gameObjects.splice(0, this.gameObjects.length);
                                this.gameState = `levelSelect`;
                            }
                        }
                        if (this.gameState === "privacy") {
                            if (this.gameObjects[i].getName() === "blindsClickerPicture" && this.roomState === "privacyInProgress") {
                                console.log("blinds geklikt");
                                this.roomState = "privacyBlindsUpBeginState";
                                console.log(this.gameState);
                                console.log(this.roomState);
                            }
                            else if (this.gameObjects[i].getName() === "blindsClickerPicture" && this.roomState === "privacyBlindsUpBeginState") {
                                console.log("blinds geklikt");
                                this.roomState = "privacyInProgress";
                                console.log(this.gameState);
                            }
                            else if (this.gameObjects[i].getName() === "blindsClickerPicture" && this.roomState === "privacyWrongUploadState") {
                                console.log("blinds geklikt");
                                this.roomState = "privacyBlindsUpWrongState";
                            }
                            else if (this.gameObjects[i].getName() == "privacyLaptop") {
                                console.log("laptop geklikt");
                                this.roomState = "privacyLaptopState";
                            }
                            else if (this.gameObjects[i].getName() == "privacyNextPicture") {
                                this.counterForClicks += 1;
                                console.log("Next geklikt");
                                this.roomState = "privacyNextPictureState";
                                console.log(this.roomState);
                                if (this.counterForClicks === 3) {
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
                            if (this.gameObjects[i].getName() === "uploadPicture" && (this.counterForClicks === 0 || this.counterForClicks === 2)) {
                                console.log("Upload geklikt");
                                this.roomState = "privacyWrongUploadState";
                            }
                            if (this.gameObjects[i].getName() === "uploadPicture" && this.counterForClicks === 1) {
                                console.log("Upload geklikt");
                                this.roomState = "privacyGoodUploadState";
                            }
                            if (this.gameObjects[i].getName() === "privacyDoor" && this.roomState === "privacyGoodUploadState") {
                                console.log("Upload geklikt");
                                this.gameState = "levelSelect";
                            }
                            if (this.gameObjects[i].getName() === "privacyDoor" && this.roomState === "privacyBlindsUpWrongState") {
                                console.log("Upload geklikt");
                                this.roomState = "privacyCreepyManInsideBlindsUpState";
                            }
                            if (this.gameObjects[i].getName() === "privacyDoor" && (this.roomState === "privacyInProgress" || this.roomState === "privacyBlindsUpBeginState")) {
                                console.log("Upload geklikt");
                                this.roomState = "levelSelect";
                            }
                            if (this.gameObjects[i].getName() === "creepyManStanding") {
                                this.roomState = "creepyManClickedState";
                            }
                            if (this.gameObjects[i].getName() === "creepyManStanding") {
                                this.roomState = "creepyManClickedBlindsUpState";
                            }
                            if (this.roomState === "creepyManClickedBlindUpUnlockedDoorState") {
                                if (this.gameObjects[i].getName() === "privacyDoor") {
                                    this.gameState = "levelSelect";
                                }
                            }
                        }
                        if (this.gameState === `catfishInProgress`) {
                            if (this.gameObjects[i].getName() === `laptop`) {
                                this.laptop(this.canvas);
                            }
                            if (this.gameObjects[i].getName() === `Website-1` || this.gameObjects[i].getName() === `Website-2` || this.gameObjects[i].getName() === `Website-3` || this.gameObjects[i].getName() === `Website-5`) {
                                this.wrongSite(this.canvas, this.ctx);
                            }
                            if (this.gameObjects[i].getName() === `Website-4`) {
                                this.goodSite(this.canvas);
                            }
                            if (this.gameObjects[i].getName() === `refresh`) {
                                this.wrongSiteEnd(this.canvas);
                            }
                            if (this.gameObjects[i].getName() === `refresh-2`) {
                                this.goodSiteEnd(this.canvas);
                            }
                            if (this.gameObjects[i].getName() == `arrow`) {
                                this.gameObjects.splice(0, this.gameObjects.length);
                                this.gameState = `levelSelect`;
                            }
                        }
                    }
                }
            }
        };
        this.keyPress = (ev) => {
            if (this.roomState === "passwordLaptopState") {
                console.log(`Key ${ev.key} has been pressed`);
                this.passwordInput.push(ev.key);
                let indexes = [];
                for (let i = 0; i < this.password.length; i++) {
                    if (ev.key === this.password[i]) {
                        indexes.push(i);
                    }
                }
            }
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.gameObjects = [];
        this.counterForClicks = 0;
        this.score = 0;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameState = "stickmanStartScreen";
        const myAudio = new Audio('assets/audio/jazzMusic.mp3');
        if (typeof myAudio.loop == 'boolean') {
            myAudio.loop = true;
        }
        else {
            myAudio.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
        }
        myAudio.play();
        window.addEventListener("keypress", this.keyPress);
        document.addEventListener("click", this.clickHandler);
        this.loop();
    }
    initiatePrivacyLevel() {
        console.log(this.gameState);
        if (this.gameState === "privacy") {
            if (this.roomState === "privacyInProgress") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.beginState();
            }
            if (this.roomState === "privacyLaptopState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                console.log("gamestate changed");
                this.laptopState();
            }
            if (this.roomState === "privacyNextPictureState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.nextPictureState();
            }
            if (this.roomState === "privacyWrongUploadState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.wrongUploadState();
            }
            if (this.roomState === "privacyBlindsUpBeginState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.blindsUpBeginState();
            }
            if (this.roomState === "privacyBlindsUpWrongState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.blindsUpWrongState();
            }
            if (this.roomState === "privacyGoodUploadState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.goodUploadState();
            }
            if (this.roomState === "privacyCreepyManInsideState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.creepyManInsideState();
            }
            if (this.roomState === "privacyCreepyManInsideBlindsUpState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.creepyManInsideBlindsUpState();
            }
            if (this.roomState === "creepyManClickedBlindsUpState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.creepyManInsideBlindsUpState();
                this.gameObjects.push(new personalMistake(400, 150, 350, 220));
                this.roomState = "creepyManClickedBlindUpUnlockedDoorState";
            }
            if (this.roomState === "creepyManClickedBlindUpUnlockedDoorState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.creepyManInsideBlindsUpState();
                this.gameObjects.push(new personalMistake(400, 150, 350, 220));
            }
            console.log(this.gameObjects);
        }
    }
    initiatePasswordLevel() {
        if (this.gameState = "password") {
            if (this.roomState === "passwordBeginState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.keyListener = new KeyListener();
                this.passwordInput = [];
                this.password = ["a", "b", "c", "1", "2", "3"];
                this.drawPasswordBegin();
            }
            if (this.roomState === "passwordLaptopState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.drawPasswordLaptop();
            }
            if (this.roomState === "passwordEndState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.drawPasswordEnd();
            }
            if (this.roomState === "passwordFinalState") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.drawPasswordQuest();
            }
            if (this.roomState === "passwordbackgroundQuestWin") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.gameObjects.push(new PasswordbackgroundQuestWin(0, 0));
            }
            if (this.roomState === "passwordbackgroundQuestFail") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.gameObjects.push(new PasswordbackgroundQuestFail(0, 0));
            }
            if (this.roomState === "trashcanClicked") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.moveTrashcan();
            }
            if (this.roomState === "paintingClicked") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.movePainting();
            }
            if (this.roomState === "plantClicked") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.movePlant();
            }
            if (this.roomState === "password-noteClicked") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.showPasswordNote();
            }
            if (this.roomState === "password-note-zoomClicked") {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.drawPasswordEnd();
            }
        }
    }
    drawPasswordQuest() {
        this.gameObjects.push(new PasswordbackgroundQuest(0, 0));
        this.gameObjects.push(new No(450, 430));
        this.gameObjects.push(new Yes(820, 430));
        this.gameObjects.push(new Arrow(10, 10, 50, 50));
    }
    drawPasswordBegin() {
        this.gameObjects.push(new PasswordbackgroundRoom(0, 0));
        this.gameObjects.push(new Table(380, 270));
        this.gameObjects.push(new LaptopPassword(650, 280));
        this.gameObjects.push(new CharacterSitting(543, 300));
        this.gameObjects.push(new Trashcan(780, 500));
        this.gameObjects.push(new Painting(360, 65));
        this.gameObjects.push(new Plant(1220, 340));
        this.gameObjects.push(new Arrow(10, 10, 50, 50));
    }
    moveTrashcan() {
        this.gameObjects.push(new PasswordbackgroundRoom(0, 0));
        this.gameObjects.push(new Table(380, 270));
        this.gameObjects.push(new LaptopPassword(650, 280));
        this.gameObjects.push(new Chair(390, 350));
        this.gameObjects.push(new CharacterPassword(540, 300));
        this.gameObjects.push(new Painting(360, 65));
        this.gameObjects.push(new Plant(1220, 340));
        this.gameObjects.push(new Trash(800, 545));
        this.gameObjects.push(new Trashcan(865, 550));
        this.gameObjects.push(new Arrow(10, 10, 50, 50));
    }
    movePainting() {
        this.gameObjects.push(new PasswordbackgroundRoom(0, 0));
        this.gameObjects.push(new Table(380, 270));
        this.gameObjects.push(new LaptopPassword(650, 280));
        this.gameObjects.push(new Chair(390, 350));
        this.gameObjects.push(new CharacterPassword(540, 300));
        this.gameObjects.push(new Trashcan(780, 500));
        this.gameObjects.push(new Plant(1220, 340));
        this.gameObjects.push(new PasswordNote(380, 95));
        this.gameObjects.push(new Painting(450, 65));
        this.gameObjects.push(new Arrow(10, 10, 50, 50));
    }
    movePlant() {
        this.gameObjects.push(new PasswordbackgroundRoom(0, 0));
        this.gameObjects.push(new Table(380, 270));
        this.gameObjects.push(new LaptopPassword(650, 280));
        this.gameObjects.push(new Chair(390, 350));
        this.gameObjects.push(new CharacterPassword(540, 300));
        this.gameObjects.push(new Trashcan(780, 500));
        this.gameObjects.push(new Painting(360, 65));
        this.gameObjects.push(new Leaf(1320, 620));
        this.gameObjects.push(new Plant(1140, 360));
        this.gameObjects.push(new Arrow(10, 10, 50, 50));
    }
    showPasswordNote() {
        this.gameObjects.push(new PasswordbackgroundRoom(0, 0));
        this.gameObjects.push(new Table(380, 270));
        this.gameObjects.push(new LaptopPassword(650, 280));
        this.gameObjects.push(new Chair(390, 350));
        this.gameObjects.push(new CharacterPassword(540, 300));
        this.gameObjects.push(new Trashcan(780, 500));
        this.gameObjects.push(new Painting(360, 65));
        this.gameObjects.push(new Plant(1220, 340));
        this.gameObjects.push(new PasswordNoteZoom(521, 95));
        this.gameObjects.push(new Arrow(10, 10, 50, 50));
    }
    drawPasswordEnd() {
        this.gameObjects.push(new PasswordbackgroundRoom(0, 0));
        this.gameObjects.push(new Table(380, 270));
        this.gameObjects.push(new LaptopPassword(650, 280));
        this.gameObjects.push(new Chair(390, 350));
        this.gameObjects.push(new CharacterPassword(540, 300));
        this.gameObjects.push(new Trashcan(780, 500));
        this.gameObjects.push(new Painting(360, 65));
        this.gameObjects.push(new Plant(1220, 340));
        this.gameObjects.push(new Arrow(10, 10, 50, 50));
    }
    drawPasswordLaptop() {
        this.gameObjects.push(new PasswordbackgroundLaptop(0, 0));
        this.gameObjects.push(new XButton(1400, 80));
        this.gameObjects.push(new ArrowButton(887, 447));
        this.gameObjects.push(new Arrow(10, 10, 50, 50));
    }
    levelSelector() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.gameObjects.push(new houseLevelSelector(0, -20, 1620, 800));
        this.gameObjects.push(new kitchenTop(960, 88, 220, 93));
        this.gameObjects.push(new livingRoomTop(370, 389, 107, 200));
        this.gameObjects.push(new DiningRoomTop(400, 77, 217, 110));
        this.gameObjects.push(new garageTop(1056, 440, 113, 187));
    }
    nextPictureState() {
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
    laptopState() {
        this.gameObjects.push(new LaptopScreenPrivacy(200, 50, 1300, 920));
        this.gameObjects.push(new houseNumber(350, 200, 800, 600));
        this.gameObjects.push(new nextPicture(1200, 600, 200, 150));
        this.gameObjects.push(new backPicture(1200, 750, 200, 150));
        this.gameObjects.push(new uploadPicture(1200, 350, 200, 150));
    }
    beginState() {
        this.gameObjects.push(new privacyBackground(0, 0, 1620, 800));
        this.gameObjects.push(new blindsClickerPicture(640, 40, 50, 300));
        this.gameObjects.push(new Laptop(850, 230, 200, 200));
        this.gameObjects.push(new blindsPicture(355, 40, 290, 330));
        this.gameObjects.push(new privacyDoor(80, 90, 130, 550));
    }
    blindsUpBeginState() {
        this.gameObjects.push(new privacyBackground(0, 0, 1620, 800));
        this.gameObjects.push(new Laptop(850, 230, 200, 200));
        this.gameObjects.push(new blindsUpPicture(355, 22, 300, 300));
        this.gameObjects.push(new blindsClickerPicture(640, 40, 50, 300));
        this.gameObjects.push(new privacyDoor(80, 90, 130, 550));
    }
    goodUploadState() {
        this.gameObjects.push(new privacyBackground(0, 0, 1620, 800));
        this.gameObjects.push(new blindsClickerPicture(640, 40, 50, 300));
        this.gameObjects.push(new Laptop(850, 230, 200, 200));
        this.gameObjects.push(new blindsPicture(355, 40, 290, 330));
        this.gameObjects.push(new privacyDoor(80, 90, 130, 550));
    }
    wrongUploadState() {
        this.gameObjects.push(new privacyBackground(0, 0, 1620, 800));
        this.gameObjects.push(new blindsClickerPicture(640, 40, 50, 300));
        this.gameObjects.push(new Laptop(850, 230, 200, 200));
        this.gameObjects.push(new CreepyMan(400, 50, 200, 300));
        this.gameObjects.push(new blindsPicture(355, 40, 290, 330));
        this.gameObjects.push(new privacyDoor(80, 90, 130, 550));
    }
    blindsUpWrongState() {
        this.gameObjects.push(new privacyBackground(0, 0, 1620, 800));
        this.gameObjects.push(new Laptop(850, 230, 200, 200));
        this.gameObjects.push(new blindsUpPicture(355, 22, 300, 300));
        this.gameObjects.push(new blindsClickerPicture(640, 40, 50, 300));
        this.gameObjects.push(new privacyDoor(80, 90, 130, 550));
    }
    creepyManInsideState() {
        this.gameObjects.push(new privacyBackground(0, 0, 1620, 800));
        this.gameObjects.push(new blindsClickerPicture(640, 40, 50, 300));
        this.gameObjects.push(new Laptop(850, 230, 200, 200));
        this.gameObjects.push(new blindsPicture(355, 40, 290, 330));
        this.gameObjects.push(new privacyDoor(80, 90, 130, 550));
        this.gameObjects.push(new CreepyManStanding(200, 200, 300, 500));
    }
    creepyManInsideBlindsUpState() {
        this.gameObjects.push(new privacyBackground(0, 0, 1620, 800));
        this.gameObjects.push(new blindsClickerPicture(640, 40, 50, 300));
        this.gameObjects.push(new Laptop(850, 230, 200, 200));
        this.gameObjects.push(new blindsUpPicture(355, 22, 300, 300));
        this.gameObjects.push(new privacyDoor(80, 90, 130, 550));
        this.gameObjects.push(new CreepyManStanding(200, 200, 300, 500));
    }
    initiateGarageLevel() {
        this.gameState = `GarageInProgress`;
        this.gameObjects.push(new GarageLightsOff(0, 0, 1920, 970), new LightSwitch(250, 150), new Arrow(10, 10, 50, 50));
    }
    drawWin(ctx, canvas) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "green";
        ctx.fillText(`You clicked all the right links! Score: ${this.score}`, 500, 40);
    }
    drawGameover(ctx, canvas) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "red";
        ctx.fillText(`Gameover. try again! Score: ${this.score}`, 500, 40);
    }
    drawStart(ctx, canvas) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "black";
        ctx.fillText(`Click all the right links! Score: ${this.score}`, 500, 40);
    }
    checkScore() {
        if (this.score == this.numberOfLinks) {
            this.roomState = `scamWin`;
            this.gameObjects.splice(0, this.gameObjects.length);
            this.turnOnLights();
        }
    }
    handleLightSwitch() {
        this.turnOnLights();
    }
    handleChugJug() {
        this.chugJug();
    }
    handleLaptop(i) {
        this.gameObjects.splice(i, 1);
        this.startGame();
        this.roomState = `scamStart`;
    }
    handleGoodLink(i) {
        this.gameObjects.splice(i, 1);
        this.score++;
    }
    handleBadLink() {
        this.roomState = `scamGameOver`;
        this.gameObjects.splice(0, this.gameObjects.length);
        this.turnOnLights();
        this.score = 0;
    }
    turnOnLights() {
        this.gameObjects.push(new GarageLightsOn(0, 0, 1920, 970), new LaptopPrivacy(850, 100), new Character(500, 200), new Arrow(10, 10, 50, 50));
    }
    chugJug() {
        this.gameObjects.push(new ChugJug(400, 300));
    }
    startGame() {
        this.roomState = `start`;
        this.numberOfLinks = 4;
        for (let i = 1; i < this.numberOfLinks + 1; i++) {
            this.gameObjects.push(new GoodLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
            this.gameObjects.push(new BadLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
        }
        console.log(this.gameObjects);
    }
    initiateKitchenLevel() {
        this.gameState = `catfishInProgress`;
        this.setBackgroundCatfish();
        this.gameObjects.push(new LaptopCatfish(450, 600), new CharacterCatfish(1600, 620), new Arrow(10, 10, 50, 50));
    }
    setBackgroundCatfish() {
        this.gameObjects.push(new BackgroundCatfish(0, 0));
    }
    setBackgroundLaptop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.gameObjects.push(new BackgroundLaptopCatfish(0, 0));
    }
    setBackgroundSite() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.gameObjects.push(new BackgroundLaptopCatfish(0, 0));
    }
    laptop(canvas) {
        this.setBackgroundLaptop();
        this.gameObjects.push(new Website(`Website-1`, `./assets/imgCatfish/chat-1.png`, 100, 90));
        this.gameObjects.push(new Website(`Website-2`, `./assets/imgCatfish/NigerianScamEmail-1.png`, 1170, 90));
        this.gameObjects.push(new Website(`Website-3`, `./assets/imgCatfish/the_nigerian_prince_scam.png`, 100, 480));
        this.gameObjects.push(new Website(`Website-4`, `./assets/imgCatfish/whatsapp-berichtje.png`, 770, 90));
        this.gameObjects.push(new Website(`Website-5`, `./assets/imgCatfish/whatsapp.png`, 1170, 480));
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        this.ctx.font = `32px Calibri`;
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`Welke foto is geen voorbeeld van catfishing `, 700, 38);
    }
    wrongSite(canvas, ctx) {
        console.log("error");
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.gameObjects.push(new BackgroundLaptopCatfish(0, 0));
        this.gameObjects.push(new Website(`bankrekening`, `./assets/img/bankrekening.png`, 54, 44));
        this.gameObjects.push(new Website(`refresh`, `./assets/img/refresh.png`, 270, 44));
        ctx.font = `102px Calibri`;
        ctx.fillStyle = "black";
        ctx.fillText(`Refresh de site `, 680, 120);
    }
    wrongSiteEnd(canvas) {
        console.log("verry nice");
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.gameObjects.push(new BackgroundLaptopCatfish(0, 0));
        this.gameObjects.push(new Arrow(10, 10, 50, 50));
        this.gameObjects.push(new Website(`blut`, `./assets/img/blut.png`, 54, 44));
    }
    goodSite(canvas) {
        console.log("verry nice");
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.gameObjects.push(new BackgroundLaptopCatfish(0, 0));
        this.gameObjects.push(new Website(`bankrekening`, `./assets/img/bankrekening.png`, 54, 44));
        this.gameObjects.push(new Website(`refresh-2`, `./assets/img/refresh-2.png`, 270, 44));
        this.ctx.font = `102px Calibri`;
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Refresh de site `, 680, 120);
    }
    goodSiteEnd(canvas) {
        console.log("verry nice");
        for (let i = -100; i < this.gameObjects.length; i++) {
            this.gameObjects.shift();
        }
        this.gameObjects.push(new BackgroundLaptopCatfish(0, 0));
        this.gameObjects.push(new Arrow(10, 10, 50, 50));
        this.gameObjects.push(new Website(`rijk`, `./assets/img/rijk.png`, 54, 44));
    }
    draw() {
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
    moveLinks() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].moveLinks(this.canvas);
        }
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class GameObjects {
    constructor(name, imgSrc, xPos, yPos) {
        this.image = GameMaster.loadNewImage(imgSrc);
        this.xPos = xPos;
        this.yPos = yPos;
        this.name = name;
        this.clickObjectState = "unclicked";
    }
    getXPos() {
        return this.xPos;
    }
    setXPos(newValue) {
        this.xPos = newValue;
    }
    getYPos() {
        return this.yPos;
    }
    getImage() {
        return this.image;
    }
    getImageWidth() {
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    getName() {
        return this.name;
    }
    move(canvas) {
    }
    moveLinks(canvas) {
    }
    draw(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.image, this.xPos, this.yPos, this.getImageWidth(), this.getImageHeight());
    }
}
class KeyListener {
    constructor() {
        this.keyCodeStates = new Array();
        this.keyCodeTyped = new Array();
        this.previousState = new Array();
        window.addEventListener("keydown", (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener("keyup", (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }
    onFrameStart() {
        this.keyCodeTyped = new Array();
        this.keyCodeStates.forEach((val, key) => {
            if (this.previousState[key] != val && !this.keyCodeStates[key]) {
                this.keyCodeTyped[key] = true;
                this.previousState[key] = val;
            }
        });
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
    isKeyTyped(keyCode) {
        return this.keyCodeTyped[keyCode] == true;
    }
}
KeyListener.KEY_1 = 49;
KeyListener.KEY_2 = 50;
KeyListener.KEY_3 = 51;
KeyListener.KEY_4 = 52;
KeyListener.KEY_5 = 53;
KeyListener.KEY_6 = 54;
KeyListener.KEY_7 = 55;
KeyListener.KEY_8 = 56;
KeyListener.KEY_9 = 57;
KeyListener.KEY_0 = 58;
KeyListener.KEY_A = 65;
KeyListener.KEY_B = 66;
KeyListener.KEY_C = 67;
KeyListener.KEY_D = 68;
KeyListener.KEY_E = 69;
KeyListener.KEY_F = 70;
KeyListener.KEY_G = 71;
KeyListener.KEY_H = 72;
KeyListener.KEY_I = 73;
KeyListener.KEY_J = 74;
KeyListener.KEY_K = 75;
KeyListener.KEY_L = 76;
KeyListener.KEY_M = 77;
KeyListener.KEY_N = 78;
KeyListener.KEY_O = 79;
KeyListener.KEY_P = 80;
KeyListener.KEY_Q = 81;
KeyListener.KEY_R = 82;
KeyListener.KEY_S = 83;
KeyListener.KEY_T = 84;
KeyListener.KEY_U = 85;
KeyListener.KEY_V = 86;
KeyListener.KEY_W = 87;
KeyListener.KEY_X = 88;
KeyListener.KEY_Y = 89;
KeyListener.KEY_Z = 90;
let init = () => {
    const StickmanGame = new GameMaster(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class Arrow extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("arrow", "./assets/img/arrow.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class DiningRoomTop extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("diningRoomTopPicture", "./assets/img/DiningRoomTop.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class garageTop extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("garageTopPicture", "./assets/img/GarageTop.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class houseLevelSelector extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("houseLevelSelector", "./assets/img/house-top-down-view.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class kitchenTop extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("kitchenTopPicture", "./assets/img/KitchenTop.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class livingRoomTop extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("livingRoomTopPicture", "./assets/img/livingRoomTop.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class startButton extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("startButton", "./assets/img/start-button.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class startScreen extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("startScreen", "./assets/img/start-scene.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class ArrowButton extends GameObjects {
    constructor(xPos, yPos) {
        super("arrowbutton", "./assets/imgPassword/arrowbutton.png", xPos, yPos);
    }
}
class Chair extends GameObjects {
    constructor(xPos, yPos) {
        super("chair", "./assets/imgPassword/chair.png", xPos, yPos);
    }
}
class CharacterPassword extends GameObjects {
    constructor(xPos, yPos) {
        super("character", "./assets/imgPassword/character.png", xPos, yPos);
    }
}
class CharacterSitting extends GameObjects {
    constructor(xPos, yPos) {
        super("character-sitting", "./assets/imgPassword/stickman-with-chair.png", xPos, yPos);
    }
}
class LaptopPassword extends GameObjects {
    constructor(xPos, yPos) {
        super("laptop-password", "./assets/imgPassword/laptop-password.png", xPos, yPos);
    }
}
class Leaf extends GameObjects {
    constructor(xPos, yPos) {
        super("leaf", "./assets/imgPassword/leaf.png", xPos, yPos);
    }
}
class No extends GameObjects {
    constructor(xPos, yPos) {
        super("no", "./assets/imgPassword/no.png", xPos, yPos);
    }
}
class Painting extends GameObjects {
    constructor(xPos, yPos) {
        super("painting", "./assets/imgPassword/painting.png", xPos, yPos);
    }
    move(canvas) {
        this.setXPos(this.getXPos() + 85);
    }
}
class PasswordCover extends GameObjects {
    constructor(xPos, yPos) {
        super("passwordcover", "./assets/imgPassword/passwordcover.png", xPos, yPos);
    }
}
class PasswordNote extends GameObjects {
    constructor(xPos, yPos) {
        super("password-note", "./assets/imgPassword/note.png", xPos, yPos);
    }
}
class PasswordNoteZoom extends GameObjects {
    constructor(xPos, yPos) {
        super("password-note-zoom", "./assets/imgPassword/note-zoom.png", xPos, yPos);
    }
}
class PasswordbackgroundLaptop extends GameObjects {
    constructor(xPos, yPos) {
        super("laptopscreen", "./assets/imgPassword/laptopscreen.png", xPos, yPos);
    }
}
class PasswordbackgroundQuest extends GameObjects {
    constructor(xPos, yPos) {
        super("password-quest", "./assets/imgPassword/password-quest.png", xPos, yPos);
    }
}
class PasswordbackgroundQuestFail extends GameObjects {
    constructor(xPos, yPos) {
        super("password-quest-fail", "./assets/imgPassword/password-quest-fail.png", xPos, yPos);
    }
}
class PasswordbackgroundQuestWin extends GameObjects {
    constructor(xPos, yPos) {
        super("password-quest-win", "./assets/imgPassword/password-quest-win.png", xPos, yPos);
    }
}
class PasswordbackgroundRoom extends GameObjects {
    constructor(xPos, yPos) {
        super("livingroom-empty", "./assets/imgPassword/livingroom-empty.png", xPos, yPos);
    }
}
class Plant extends GameObjects {
    constructor(xPos, yPos) {
        super("plant", "./assets/imgPassword/plant.png", xPos, yPos);
    }
    move(canvas) {
        this.setXPos(this.getXPos() - 85);
    }
}
class Table extends GameObjects {
    constructor(xPos, yPos) {
        super("table", "./assets/imgPassword/table.png", xPos, yPos);
    }
}
class Trash extends GameObjects {
    constructor(xPos, yPos) {
        super("trash", "./assets/imgPassword/trash.png", xPos, yPos);
    }
}
class Trashcan extends GameObjects {
    constructor(xPos, yPos) {
        super("trashcan", "./assets/imgPassword/trashcan.png", xPos, yPos);
    }
}
class XButton extends GameObjects {
    constructor(xPos, yPos) {
        super("xbutton", "./assets/imgPassword/xbutton.png", xPos, yPos);
    }
}
class Yes extends GameObjects {
    constructor(xPos, yPos) {
        super("yes", "./assets/imgPassword/yes.png", xPos, yPos);
    }
}
class Garage {
    constructor(canvas) {
        this.clickHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            for (let i = 0; i < this.gameObjects.length; i++) {
                if (event.clientX >= this.gameObjects[i].getXPos() &&
                    event.clientX < this.gameObjects[i].getXPos() + this.gameObjects[i].getImageWidth() &&
                    event.clientY >= this.gameObjects[i].getYPos() &&
                    event.clientY <= this.gameObjects[i].getYPos() + this.gameObjects[i].getImageHeight()) {
                    console.log(`clicked ${this.gameObjects[i].getName()}`);
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
            }
        };
        this.canvas = canvas;
        this.setBackground();
        this.canvas.addEventListener(`click`, this.clickHandler);
        this.gameObjects = [];
        this.gameObjects.push(new LightSwitch(250, 150));
        this.gameState = `start`;
        this.numberOfLinks = 3;
        this.score = 0;
    }
    handleLightSwitch() {
        this.turnOnLights();
    }
    handleChugJug() {
        this.chugJug();
    }
    handleLaptop(i) {
        this.gameObjects.splice(i, 1);
        this.startGame();
    }
    handleGoodLink(i) {
        console.log(`test`);
        this.gameObjects.splice(i, 1);
        this.score++;
    }
    handleBadLink() {
        console.log(`test2`);
        this.gameState = `gameover`;
        this.gameObjects.splice(0, this.gameObjects.length);
        this.turnOnLights();
        this.score = 0;
    }
    setBackground() {
        document.body.style.backgroundImage = `url(./assets/img/garageLightsOut.png)`;
    }
    turnOnLights() {
        document.body.style.backgroundImage = `url(./assets/img/garageLightsOn.png)`;
        this.gameObjects.push(new LaptopCatfish(850, 100), new Character(500, 200));
    }
    chugJug() {
        this.gameObjects.push(new ChugJug(400, 300));
    }
    startGame() {
        this.gameState = `start`;
        for (let i = 1; i < this.numberOfLinks + 1; i++) {
            this.gameObjects.push(new GoodLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
            this.gameObjects.push(new BadLink(GameMaster.randomNumber(100, this.canvas.width - 400), GameMaster.randomNumber(100, this.canvas.height - 150), i));
        }
    }
    draw(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let index = 0; index < this.gameObjects.length; index++) {
            this.gameObjects[index].draw(canvas);
        }
        if (this.gameState === `startgame`) {
            this.drawStart(ctx, canvas);
        }
        if (this.gameState === `win`) {
            this.drawWin(ctx, canvas);
        }
        if (this.gameState === `gameover`) {
            this.drawGameover(ctx, canvas);
        }
    }
    drawGameover(ctx, canvas) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "red";
        ctx.fillText(`You clicked a bad link!`, canvas.width / 2, 40);
    }
    drawWin(ctx, canvas) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "green";
        ctx.fillText(`You clicked all the right links! Score: ${this.score}`, canvas.width / 2, 40);
    }
    drawStart(ctx, canvas) {
        ctx.font = `32px Calibri`;
        ctx.fillStyle = "black";
        ctx.fillText(`Click all the right links! Score: ${this.score}`, canvas.width / 2, 40);
    }
    move(canvas) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].move(canvas);
        }
    }
    checkScore() {
        if (this.score == this.numberOfLinks) {
            this.gameState = `win`;
            this.gameObjects.splice(0, this.gameObjects.length);
            this.turnOnLights();
        }
    }
}
class BadLink extends GameObjects {
    constructor(xPos, yPos, link) {
        super(`badlink`, `./assets/imgSCAM/bad${link}.png`, xPos, yPos);
        this.xVelocity = GameMaster.randomNumber(-5, 5);
        this.yVelocity = GameMaster.randomNumber(-5, 5);
    }
    moveLinks(canvas) {
        this.xPos += this.xVelocity;
        this.yPos += this.yVelocity;
        if (this.xPos <= 0 || this.xPos + this.getImageWidth() >= canvas.width) {
            this.xVelocity = -this.xVelocity;
        }
        if (this.yPos <= 0 || this.yPos + this.getImageHeight() >= canvas.height) {
            this.yVelocity = -this.yVelocity;
        }
    }
}
class Character extends GameObjects {
    constructor(xPos, yPos) {
        super(`character`, `./assets/imgSCAM/character.png`, xPos, yPos);
    }
}
class ChugJug extends GameObjects {
    constructor(xPos, yPos) {
        super(`chugjug`, `./assets/imgSCAM/ChugJug-resize.png`, xPos, yPos);
    }
}
class GarageLightsOff extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("garagelightsoff", "./assets/imgSCAM/garageLightsOut.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class GarageLightsOn extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("garagelightson", "./assets/imgSCAM/garageLightsOn.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class GoodLink extends GameObjects {
    constructor(xPos, yPos, link) {
        super(`goodlink`, `./assets/imgSCAM/good${link}.png`, xPos, yPos);
        this.xVelocity = GameMaster.randomNumber(-3, 3);
        this.yVelocity = GameMaster.randomNumber(-3, 3);
    }
    moveLinks(canvas) {
        this.xPos += this.xVelocity;
        this.yPos += this.yVelocity;
        if (this.xPos <= 0 || this.xPos + this.getImageWidth() >= canvas.width) {
            this.xVelocity = -this.xVelocity;
        }
        if (this.yPos <= 0 || this.yPos + this.getImageHeight() >= canvas.height) {
            this.yVelocity = -this.yVelocity;
        }
    }
}
class LaptopPrivacy extends GameObjects {
    constructor(xPos, yPos) {
        super(`laptop`, `./assets/imgSCAM/laptop-color.png`, xPos, yPos);
    }
}
class LightSwitch extends GameObjects {
    constructor(xPos, yPos) {
        super(`lightswitch`, `./assets/imgSCAM/lightSwitchTransparent.png`, xPos, yPos);
    }
}
class BackgroundCatfish extends GameObjects {
    constructor(xPos, yPos) {
        super("BackgroundCatfish", "./assets/imgCatfish/keuken-niet-trans.png", xPos, yPos);
    }
}
class BackgroundLaptopCatfish extends GameObjects {
    constructor(xPos, yPos) {
        super("BackgroundLaptopCatfish", "./assets/imgCatfish/Laptopscherm.png", xPos, yPos);
    }
}
class CharacterCatfish extends GameObjects {
    constructor(xPos, yPos) {
        super(`character`, `./assets/imgCatfish/character.png`, xPos, yPos);
    }
}
class LaptopCatfish extends GameObjects {
    constructor(xPos, yPos) {
        super(`laptop`, `./assets/imgCatfish/laptop-resize.png`, xPos, yPos);
    }
}
class Website extends GameObjects {
    constructor(name, imgSrc, xPos, yPos) {
        super(name, imgSrc, xPos, yPos);
    }
}
class backPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("backPicture", "./assets/imgPrivacy/Back.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class blindsClickerPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("blindsClickerPicture", "./assets/imgPrivacy/BlindsClickerPicture.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class blindsPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("blindsPicture", "./assets/imgPrivacy/BlindsPicture.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class blindsUpPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("blindsUpPicture", "./assets/imgPrivacy/BlindsUpPicture.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class CreepyMan extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("CreepyMan", "./assets/imgPrivacy/creepyMan.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class Laptop extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("privacyLaptop", "./assets/imgPrivacy/laptopPrivacy.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class nextPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("privacyNextPicture", "./assets/imgPrivacy/Next.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class uploadPicture extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("uploadPicture", "./assets/imgPrivacy/Upload.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class CreepyManStanding extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("creepyManStanding", "./assets/imgPrivacy/creepyManStanding.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class houseNumber extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("houseNumber", "./assets/imgPrivacy/houseNumber.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class LaptopScreenPrivacy extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("privacyLaptopScreen", "./assets/imgPrivacy/laptopScreen.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class personBirthday extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("personBirthday", "./assets/imgPrivacy/personBirthday.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class personID extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("personID", "./assets/imgPrivacy/personID.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class personalMistake extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("personalMistake", "./assets/imgPrivacy/personalMistake.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class privacyBackground extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("backgroundPrivacy", "./assets/imgPrivacy/backgroundPrivacy.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
class privacyDoor extends GameObjects {
    constructor(xPos, yPos, thisWidth, thisHeight) {
        super("privacyDoor", "./assets/imgPrivacy/privacyDoor.png", xPos, yPos);
        this.image.width = thisWidth;
        this.image.height = thisHeight;
    }
}
//# sourceMappingURL=app.js.map