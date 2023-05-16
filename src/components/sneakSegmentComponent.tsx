import React, { FC } from "react";
import { GRID_SIZE } from "../constant";

interface SneakSegmentProps{
    segment: any;
    color: string;
    index: number;
}

export const SneakSegmentComponent: FC<SneakSegmentProps> = ({segment, color, index}) => {
    return(
        <div
          key={index}
          style={{
            position: "absolute",
            top: segment.y * GRID_SIZE,
            left: segment.x * GRID_SIZE,
            width: GRID_SIZE,
            height: GRID_SIZE,
            backgroundColor: `${color}`,
          }}
        />
    );
}