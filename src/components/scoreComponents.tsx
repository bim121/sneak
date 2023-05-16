import { FC } from "react";
import style from "../App.module.css";

interface ScoreProps{
    score: number;
    raitings: Number[];
}

export const ScoreComponent: FC<ScoreProps> = ({score, raitings}) => {
    return(
        <div className={style.score}>
            <div className={style.mainName}>score: {score}</div>
            <div className={style.raiting}>
            {raitings?.map((raiting: any, index: any) => (
                <div key={index}>{index + 1}: {raiting}</div>
            ))}
            </div>
      </div>
    );
}