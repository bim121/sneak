import React, { useState, useEffect, useRef } from "react";
import style from "./App.module.css";
import { Direction } from "./types/Direction";
import { CANVAS_SIZE, GRID_SIZE } from "./constant";
import { ScoreCounter } from "./class/ScoreCounter";
import { Draw } from "./class/Draw";
import { Snake } from "./class/Sneak";
import { SneakSegmentComponent } from "./components/sneakSegmentComponent";
import { ScoreComponent } from "./components/scoreComponents";

const Game: React.FC = () => {
  const [direction, setDirection] = useState("right");
  const [draw, setDraw] = useState<Draw>(new Draw());
  const [snake, setSnake] = useState<Snake>(new Snake([{ x: 5, y: 5 }], Direction.Down, new ScoreCounter(0), draw));
  const [raitings, setRaitings] = useState<Number[]>([]);
  const didLogRef = useRef(false);

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
      if (!snake.isAlive) {
        restart();
      }else{
        setSnake(new Snake(snake.segments, newDirection, snake.score, draw));
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [snake]);

  const restart = () => {
    alert("You lose this game")
    let sortArr = [...raitings];
    sortArr.push(snake.getScore());
    sortArr.sort().reverse();
    setRaitings(sortArr);
    snake.draw.deleteApple();
    setSnake(new Snake([{ x: 5, y: 5 }], Direction.Down, new ScoreCounter(0), new Draw()))
    snake.draw.generateApple();
    snake.draw.drawing();
  }

  useEffect(() => {
    if (didLogRef.current === false) {
      draw.generateApple();
      draw.drawing();
      didLogRef.current = true;
    }
  }, []);

  return (
    <div className={style.wrapper}>
      <canvas id="my" width={CANVAS_SIZE} height={CANVAS_SIZE} className={style.canvas}/>
      {snake.segments.map((segment : any, index: any) => 
        index !== 0 ?
        <SneakSegmentComponent segment = {segment} key = {index} color = {"green"} index = {index}/> : 
        <SneakSegmentComponent segment = {segment} key = {index} color = {"black"} index = {index}/>
      )}
      <ScoreComponent score={snake.getScore()} raitings={raitings} />
    </div>
  );
};

export default Game;
