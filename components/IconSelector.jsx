import React from "react";
import Image from "next/image";

export default function IconSelector({ code, isBar, title }) {
  return (
    <Image
      src={`https://openweathermap.org/img/wn/${code}@2x.png`}
      width={isBar ? 30 : 100}
      height={isBar ? 30 : 100}
      alt={title}
    />
  );
}
