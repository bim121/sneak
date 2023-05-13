import React, { useState, useEffect, useRef } from "react";
import style from "./App.module.css";

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

interface Point {
  x: number;
  y: number;
}

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

class Apple {
  constructor(public x: number, public y: number, public size: number = 20) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

const apples: Apple[] = [];

function generateApple() {
  const x = Math.floor(Math.random() * 18) * 20;
  const y = Math.floor(Math.random() * 18) * 20;
  const apple = new Apple(x, y);
  apples.push(apple);
}

generateApple();

class Snake {
  segments: Point[] = [];
  direction;

  constructor(startingPoints: Point[], direction: Direction) {
      for(let i = 0 ; i < startingPoints.length; i++){
          this.segments.push(startingPoints[i]);
          this.direction = direction;
      }
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
      return;
    }

    const appleIndex = apples.findIndex((apple) =>apple.x === newHead.x*20 &&  apple.y === newHead.y*20);
    if (appleIndex !== -1) {
      this.grow();
      deleteApple();
      generateApple();
      drawing();
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

const drawing: any = () => {
  const canvas = document.getElementById("my") as HTMLCanvasElement;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
          apples[0].draw(context);
        }
      }
}

const deleteApple: any = () => {
  const canvas = document.getElementById("my") as HTMLCanvasElement;
  const context = canvas.getContext('2d');
  if(context){
    context.fillStyle = 'yellow';
    context.fillRect(apples[0].x, apples[0].y, 20, 20);
    apples.splice(0, 1);
  }
}

const Game: React.FC = () => {
  const [direction, setDirection] = useState("right");
  const [snake, setSnake] = useState<Snake>(new Snake([{ x: 5, y: 5 }], Direction.Down));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "ArrowUp" && direction !== "down") {
        setDirection("up");
      } else if (event.code === "ArrowDown" && direction !== "up") {
        setDirection("down");
      } else if (event.code === "ArrowLeft" && direction !== "right") {
        setDirection("left");
      } else if (event.code === "ArrowRight" && direction !== "left") {
        setDirection("right");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      snake.setDirection(direction);
    }, 50);

    return () => {
      clearInterval(intervalId);
    };
  }, [direction, snake]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      snake.move();
      let newDirection = Direction.Down;
      if(direction === "right"){
        newDirection = Direction.Right;
      }
      if(direction === "left"){
        newDirection = Direction.Left;
      }
      if(direction === "up"){
        newDirection= Direction.Up;
      }
      if(direction === "down"){
        newDirection= Direction.Down;
      }
      setSnake(new Snake(snake.segments, newDirection));
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [snake]);

  useEffect(() => {
      drawing();
  }, []);


  return (
    <div>
      <canvas id="my" width={CANVAS_SIZE} height={CANVAS_SIZE} className={style.canvas}/>
      {snake.segments.map((segment : any, index: any) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: segment.y * GRID_SIZE,
            left: segment.x * GRID_SIZE,
            width: GRID_SIZE,
            height: GRID_SIZE,
            backgroundColor: "green",
          }}
        />
      ))}
    </div>
  );
};

export default Game;
