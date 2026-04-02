export class Game {
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        // rainbow run guy
        this.x = 50;
        this.y = 50;
        this.width = 50;
        this.height = 50;

        // collect 10
        this.stars = [];
 
        //
        this.ySpeed = 0.5;
        this.maximumYSpeed = 8;

        // game stats (instance properties)
     
        this.starsCollected = 0;

        // load image
        this.image = new Image();
        this.image.src = "playerPlaceHolder/playerPlaceHolder.png";
    }
}