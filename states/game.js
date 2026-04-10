import { Stars } from "./Stars.js";

export class Game {
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        // player
        this.x = 50;
        this.y = 400;
        this.width = 50;
        this.height = 50;

        // stars
        this.stars = [];
        this.starsCollected = 0;

        // world scroll
        this.xSpeed = 3;
        this.maximumXSpeed = 8;
        this.cameraX = 0;
        this.worldSpeed = 5;
        this.changeToState = false;

        // platform
        this.platform = {
            x: 500,
            y: 450,
            width: 200,
            height: 20
        };

        // player image
        this.image = new Image();
        this.image.src = "./states/playerPlaceHolder.png";
    }

    enterGame() {
        this.starsCollected = 0;
        this.x = 50;
        this.y = 400;

        this.xSpeed = 3;
        this.cameraX = 0;
        this.worldSpeed = 0;
        this.changeToState = false;

        this.platform.x = 500;
        this.platform.y = 450;

        const display = document.getElementById("starsDisplay");
        if (display) {
            display.innerHTML = "Stars Collected: " + this.starsCollected;
        }

        this.stars = [];
        for (let i = 0; i < 10; i++) {
            const star = new Stars(this.canvas, this.pencil);
            star.x = this.canvas.width + i * 150;
            this.stars.push(star);
        }
    }

    draw() {
        this.pencil.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        );

        this.pencil.fillStyle = "green";
        this.pencil.fillRect(
            this.platform.x,
            this.platform.y,
            this.platform.width,
            this.platform.height
        );

        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Game", 300, 50);
    }

    gravity() {
        // placeholder until  jumping/falling logic
    }

    checkCollision(player, star) {
        return !(
            player.x + player.width < star.x ||
            player.x > star.x + star.width ||
            player.y + player.height < star.y ||
            player.y > star.y + star.height
        );
    }

    collectStars() {
        const playerBox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };

        for (let i = this.stars.length - 1; i >= 0; i--) {
            const star = this.stars[i];

            if (this.checkCollision(playerBox, star)) {
                this.stars.splice(i, 1);
                this.starsCollected++;

                const display = document.getElementById("starsDisplay");
                if (display) {
                    display.innerHTML = "Stars Collected: " + this.starsCollected;
                }
            }
        }
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

        for (const star of this.stars) {
            star.move();
            star.draw();
        }

        this.collectStars();
        this.draw();

        if (this.changeToState) {
            const result = this.changeToState;
            this.changeToState = false;
            return result;
        }
    }
}
