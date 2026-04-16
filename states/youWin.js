import { Toolbox } from "../toolbox.js"; // breaks without this import

export class YouWin {
    canvas;
       pencil;
       changeToState = false;
       toolbox = new Toolbox();
   
       // Restart Button
       startButtonX = 300;
       startButtonY = 200;
       startButtonW = 100;
       startButtonH = 50;
   
       // Credits Button
       creditsButtonX = 300;
       creditsButtonY = 300;
       creditsButtonW = 100;
       creditsButtonH = 50;
   
       constructor(canvas, pencil) {
           this.canvas = canvas;
           this.pencil = pencil;
   
           this.onKeyPressed = this.onKeyPressed.bind(this);
           this.onClicked = this.onClicked.bind(this);
   
           document.addEventListener("keypress", this.onKeyPressed);
           document.addEventListener("click", this.onClicked);
       }

       onKeyPressed() {
        // keyboard always starts the game
        this.changeToState = "game"; //working click to start, 
        // cant coment out of breaks the code
    }

    onClicked(event) {
        // Restart button check
        let hitRestart = this.toolbox.isWithinRect(
            event.offsetX, event.offsetY,
            this.startButtonX, this.startButtonY,
            this.startButtonW, this.startButtonH
        );

        // CREDITS button check
        let hitCredits = this.toolbox.isWithinRect(
            event.offsetX, event.offsetY,
            this.creditsButtonX, this.creditsButtonY,
            this.creditsButtonW, this.creditsButtonH
        );

        if (hitRestart) this.changeToState = "game";
        if (hitCredits) this.changeToState = "credits";
    }

  

    
        update() {
        // clear screen each frame
        this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("You Win!", 10, 50);

        // Draw Restart button
        this.pencil.fillStyle = "pink";
        this.pencil.fillRect(
            this.startButtonX, this.startButtonY,
            this.startButtonW, this.startButtonH
        );

        /// how to put text over drawn images
        this.pencil.fillStyle = "black";
        this.pencil.fillText("Restart",
            this.startButtonX + 20,
            this.startButtonY + 30
        );

        // Draw CREDITS button
        this.pencil.fillStyle = "lightblue";
        this.pencil.fillRect(
            this.creditsButtonX, this.creditsButtonY,
            this.creditsButtonW, this.creditsButtonH
        );
        /// how to put text over drawn images
        this.pencil.fillStyle = "black";
        this.pencil.fillText("Credits",
            this.creditsButtonX + 15,
            this.creditsButtonY + 30
        );

        // if state changed, return it
        if (this.changeToState) {
            const result = this.changeToState;
            this.changeToState = false;
            return result;  // "game" or "credits"
        }
        console.log("youWin");
        
    }

}