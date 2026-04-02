export class Stars{

    
    canvas;
    pencil;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.size = 60;

         // rainbow run guy
        this.x = 150;
        this.y = 350;
        this.width = 60;
        this.height = 60;


        // Load image
        this.image = new Image();
        this.image.src = "./states/starPlaceHolder.png";

        this.width = this.size;
        this.height = this.size;

        this.reset();
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