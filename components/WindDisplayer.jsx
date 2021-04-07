import React from "react";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import Tooltip from "@material-ui/core/Tooltip";

export default function WindDisplayer({ angle, speed }) {
  return (
    <>
      <Tooltip
        title={`Wind direction ${angle} degrees, wind speed is ${speed} `}
      >
        <ArrowUpwardOutlinedIcon style={{ transform: `rotate(${angle}deg)` }} />
      </Tooltip>
      {speed}
    </>
  );
}
