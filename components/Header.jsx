import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";

// Icons
import CloudIcon from "@material-ui/icons/Cloud";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import LooksIcon from "@material-ui/icons/Looks";
import AcUnitIcon from "@material-ui/icons/AcUnit";

export default function Header() {
  const [state, setState] = useState(0);
  const iconArr = [
    <CloudIcon style={{ fontSize: 80 }} color="primary" />,
    <WbSunnyIcon style={{ fontSize: 80 }} color="primary" />,
    <LooksIcon style={{ fontSize: 80 }} color="primary" />,
    <AcUnitIcon style={{ fontSize: 80 }} color="primary" />,
  ];

  useEffect(() => {
    const headerSwitch = setInterval(() => {
      if (state + 1 < iconArr.length - 1) {
        setState(state + 1);
      } else {
        setState(0);
      }
    }, 1000);
    return () => {
      clearInterval(headerSwitch);
    };
  }, [state]);

  return <Container maxWidth="sm">{iconArr[state]}</Container>;
}
