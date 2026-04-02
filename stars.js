export class Stars{

    
    canvas;
    pencil;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.size = 60;


        // Load image
        this.image = new Image();
        this.image.src = "./states/starPlaceHolder.png";

        this.width = this.size;
        this.height = this.size;

        this.reset();
    }
     reset() {
        this.x = this.canvas.width;
        this.y = Math.floor(Math.random() * (this.canvas.height - this.height));
        this.speed = Math.random() * 5 + 2;
    }

    move() {
        this.x -= this.speed;

        if (this.x + this.width < 0) {
            this.reset();
        }
    }

     draw()
      {

        // Draw star
        this.pencil.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }


}