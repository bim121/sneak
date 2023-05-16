import { Direction } from "../types/Direction";
import { Point } from "../types/Point";
import { Draw } from "./Draw";
import { ScoreCounter } from "./ScoreCounter";

export class Snake {
    score: ScoreCounter;
    segments: Point[] = [];
    direction;
    draw: Draw;
    isAlive: boolean = true;
  
    constructor(startingPoints: Point[], direction: Direction, score: ScoreCounter, draw: Draw) {
        for(let i = 0 ; i < startingPoints.length; i++){
            this.segments.push(startingPoints[i]);
        }
        this.direction = direction;
        this.score = score;
        this.draw = draw;
    }
  
    public getScore(): number{
      return this.score.score;
    }
  
    public grow() {
      const lastPoint = this.segments[this.segments.length - 1];
      const newPoint = {
        x: lastPoint.x + 20,
        y: lastPoint.y + 20
      };
      this.segments.push(newPoint);
    }
  
    move() {
      const head = this.segments[0];
      let newHead: Point = { x: head.x, y: head.y };
  
      switch (this.direction) {
        case Direction.Up:
          newHead.y -= 1;
          break;
        case Direction.Down:
          newHead.y += 1;
          break;
        case Direction.Left:
          newHead.x -= 1;
          break;
        case Direction.Right:
          newHead.x += 1;
          break;
      }
  
      if (newHead.x < 0 || newHead.x >= 20 || newHead.y < 0 || newHead.y >= 20) {
        this.isAlive = false;
        return;
      }
  
      if (this.segments.slice(1).some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        this.isAlive = false;
        return;
      }
  
      const appleIndex = (this.draw.apple.x === newHead.x*20 &&  this.draw.apple.y === newHead.y*20);
      if (appleIndex) {
        this.grow();
        this.draw.deleteApple();
        this.draw.generateApple();
        this.draw.drawing();
        this.score.increaseScore();
        
      }
  
      this.segments.unshift(newHead);
      this.segments.pop();
    }
  
    setDirection(direct:string) {
      let newDirection: Direction = Direction.Left;
      if(direct === "right"){
        newDirection = Direction.Right;
      }
      if(direct === "left"){
        newDirection = Direction.Left;
      }
      if(direct === "up"){
        newDirection= Direction.Up;
      }
      if(direct === "down"){
        newDirection= Direction.Down;
      }
  
      this.direction = newDirection;
    }
  }
  