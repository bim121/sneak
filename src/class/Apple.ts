export class Apple {
    constructor(public x: number, public y: number, public size: number = 20) {}
  
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }