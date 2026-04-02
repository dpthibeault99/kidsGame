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


}