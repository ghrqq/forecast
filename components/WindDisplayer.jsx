import React from "react";
// Material
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import Tooltip from "@material-ui/core/Tooltip";

export default function WindDisplayer({ angle, speed, matches }) {
  return (
    <>
      <Tooltip
        title={`Wind direction ${angle} degrees, wind speed is ${speed} km/h `}
      >
        <ArrowUpwardOutlinedIcon style={{ transform: `rotate(${angle}deg)` }} />
      </Tooltip>
      {speed}km/h
    </>
  );
}
