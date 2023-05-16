import { Apple } from "./Apple";

export class Draw {
  canvas: HTMLCanvasElement;
  context:any;
  apple: Apple = new Apple(20, 20);
  
    constructor() {
      this.canvas = document.getElementById("my") as HTMLCanvasElement;
    }
  
    drawing (){
      this.canvas = document.getElementById("my") as HTMLCanvasElement;
      if (this.canvas) {
        this.context = this.canvas.getContext('2d');
        if (this.context) {
            this.apple.draw(this.context);
          }
        }
      else{
        if(!this.canvas) {setTimeout(this.drawing, 100);}
      }
    }

    deleteApple() {
      if (this.canvas) {
        this.context = this.canvas.getContext('2d');
        if(this.context){
          var img = new Image();   // Создаёт новый элемент img
          img.src = 'https://img.freepik.com/premium-vector/grass-lawn-abstract-seamless-background-game-asset-pattern-natural-field-herbs-top-view_191307-627.jpg';
          this.context.drawImage(img, this.apple.x, this.apple.y, 20, 20);
        }
      }
    }

    generateApple() {
      const x = Math.floor(Math.random() * 18) * 20;
      const y = Math.floor(Math.random() * 18) * 20;
      this.apple = new Apple(x, y);
    }

}
