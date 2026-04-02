// clean up stars, they take place of kaboom / meteors

export class Game {
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        // rainbow run guy
        this.x = 50;
        this.y = 350;
        this.width = 50;
        this.height = 50;

        // collect 10
        // this.toolbox = new Toolbox();
        this.stars = [];
 
        // scroll world left (doesnt work)
       this.xSpeed = 0.5;
       this.maximumXSpeed = 8;

       // this.platform, not Let. 
       // this. should be used for 
       // constructors 
       this.platform = {
        x: 500,
        y: 450,
       width: 200,
       height: 20
    };

        // game stats (instance properties)
     
        this.starsCollected = 0;

        // load image
        this.image = new Image();
        this.image.src = "./states/playerPlaceHolder.png";

     
    }

    // called when you want to reset/start the gameplay (not creating timers)
    enterGame() {
        // reset stats
        
        this.starsCollected = 0;
        document.getElementById("starDisplay").innerHTML = "Stars Collected: " + this.starsCollected;

        // reset bird
        this.x = 50;
        this.y = 50;
        this.xSpeed = 0.5;

        //camera - scroll left
        this.cameraX = 0;
        this.worldSpeed = 0;

        // reset/respawn meteors & projectiles
        this.stars = [];
        for (let i = 0; i < 10; i++) {
            this.meteors.push(new Meteor(this.canvas, this.pencil));
        }
    }

    draw() {
        this.pencil.drawImage(this.image, this.x, this.y, this.width, this.height);
    }


    gravity() {
        // this.x += this.xSpeed;
        // this.xSpeed += 2;
        // if (this.xSpeed > this.maximumxSpeed) this.xSpeed = this.maximumxSpeed;
    }


    // AABB collision
    checkCollision(bird, meteor) {
        return !(
            bird.x + bird.width < meteor.x ||
            bird.x > meteor.x + meteor.size ||
            bird.y + bird.height < meteor.y ||
            bird.y > meteor.y + meteor.size
        );
    }


    update() {
        this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // bird
        this.gravity();
        this.draw();

        // meteors
        for (let m of this.meteors) {
            m.move();
            m.draw();
        }

        // bird hitbox
        let birdBox = { x: this.x, y: this.y, width: this.width, height: this.height };

        // bird–meteor collision (immediate return to stop further updates)
        for (let m of this.meteors) {
            if (this.checkCollision(birdBox, m)) {
                console.log("HIT!");
                this.stopTimer();           // stop counting time
                this.changeToState = "gameOver";
                return "gameOver";          // immediately switch state
            }
        }

        // projectiles: update & check projectile→meteor collisions
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            let p = this.projectiles[i];
            p.update();
            p.draw();

            if (p.isOffscreen(this.canvas.width)) {
                this.projectiles.splice(i, 1);
                continue;
            }

            for (let m = this.meteors.length - 1; m >= 0; m--) {
                let meteor = this.meteors[m];
                let hit =
                    p.x < meteor.x + meteor.size &&
                    p.x + p.width > meteor.x &&
                    p.y < meteor.y + meteor.size &&
                    p.y + p.height > meteor.y;

                if (hit) {
                    console.log("STAR  COLLECTED");
                    this.starsCollected++;
                    const kb = document.getElementById("starsDisplay");
                    if (kb) kb.innerHTML = "Stars Collected: " + this.starsCollected;

                    // replace destroyed meteor with a new one
                    this.meteors.splice(m, 1);
                    this.meteors.push(new Meteor(this.canvas, this.pencil));

                    // remove projectile
                    this.projectiles.splice(i, 1);

                    // win condition example
                    if (this.starsCollected === 10) {
                        this.stopTimer();
                        this.changeToState = "youWin";
                        return "youWin";
                    }
                    break;
                }
            }
        }

        // HUD
        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Game", 300, 50);

        // return state if set (keeps compatibility if code expects it)
        if (this.changeToState) {
            const result = this.changeToState;
            this.changeToState = false;
            return result;
        }
    }
}