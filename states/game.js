export class Game {
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        // rainbow run guy
        this.x = 50;
        this.y = 50;
        this.width = 50;
        this.height = 50;

        // stars (objects in world)
        this.stars = [];

        // scroll world left
        this.xSpeed = 0.5;
        this.maximumXSpeed = 8;

        this.platform = {
            x: 500,
            y: 450,
            width: 200,
            height: 20
        };

        this.starsCollected = 0;

        this.image = new Image();
        this.image.src = "./states/playerPlaceHolder.png";
    }

    enterGame() {
        this.starsCollected = 0;

        // FIXED ID
        document.getElementById("starsDisplay").innerHTML =
            "Stars Collected: " + this.starsCollected;

         // player start point
        this.x = 50;
        this.y = 400;
        this.xSpeed = 0.5;

        this.cameraX = 0;
        this.worldSpeed = 0;

        // spawn stars
        this.stars = [];
        for (let i = 0; i < 10; i++) {
            this.stars.push(new Star(this.canvas, this.pencil)); 
        }
    }

    draw() {
        this.pencil.drawImage(this.image, this.x, this.y, this.width, this.height);

        this.pencil.fillStyle = "green";
        this.pencil.fillRect(
            this.platform.x,
            this.platform.y,
            this.platform.width,
            this.platform.height
        );
    }

    gravity() {} // need to redue

    // renamed star
    checkCollision(bird, star) {
        return !(
            bird.x + bird.width < star.x ||
            bird.x > star.x + star.size ||
            bird.y + bird.height < star.y ||
            bird.y > star.y + star.size
        );
    }

    update() {
        this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // scrolling
        this.cameraX += this.xSpeed;
        this.platform.x -= this.xSpeed;

        if (this.platform.x + this.platform.width < 0) {
            this.platform.x = this.canvas.width;
        }

        this.gravity();
        this.draw();

        //  STARS
        for (let s of this.stars) {
            s.move();
            s.draw();
        }

        let birdBox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };

        // collision with stars
        for (let s of this.stars) {
            if (this.checkCollision(birdBox, s)) {
                console.log("HIT!");
                this.stopTimer();
                this.changeToState = "gameOver";
                return "gameOver";
            }
        }

        // projectiles vs stars
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            let p = this.projectiles[i];
            p.update();
            p.draw();

            if (p.isOffscreen(this.canvas.width)) {
                this.projectiles.splice(i, 1);
                continue;
            }

            for (let s = this.stars.length - 1; s >= 0; s--) {
                let star = this.stars[s];

                let hit =
                    p.x < star.x + star.size &&
                    p.x + p.width > star.x &&
                    p.y < star.y + star.size &&
                    p.y + p.height > star.y;

                if (hit) {
                    console.log("STAR COLLECTED");

                    this.starsCollected++;
                    const kb = document.getElementById("starsDisplay");
                    if (kb) {
                        kb.innerHTML = "Stars Collected: " + this.starsCollected;
                    }

                    // replace star
                    this.stars.splice(s, 1);
                    this.stars.push(new Meteor(this.canvas, this.pencil));

                    this.projectiles.splice(i, 1);

                    if (this.starsCollected === 10) {
                        this.stopTimer();
                        this.changeToState = "youWin";
                        return "youWin";
                    }
                    break;
                }
            }
        }

        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Game", 300, 50);

        if (this.changeToState) {
            const result = this.changeToState;
            this.changeToState = false;
            return result;
        }
    }
}