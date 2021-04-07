import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";

// Icons
import CloudIcon from "@material-ui/icons/Cloud";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import LooksIcon from "@material-ui/icons/Looks";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

export default function Header() {
  const [state, setState] = useState(0);
  const iconArr = [
    <BeachAccessIcon style={{ fontSize: 80 }} color="primary" />,
    <CloudIcon style={{ fontSize: 80 }} color="primary" />,
    <WbSunnyIcon style={{ fontSize: 80 }} color="primary" />,
    <LooksIcon style={{ fontSize: 80 }} color="primary" />,
    <AcUnitIcon style={{ fontSize: 80 }} color="primary" />,
  ];

  useEffect(() => {
    const headerSwitch = setInterval(() => {
      if (state + 1 < iconArr.length) {
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
