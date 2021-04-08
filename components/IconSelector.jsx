import React from "react";
import Image from "next/image";

export default function IconSelector({ code, isBar, title, matches }) {
  // Icon selector gets some data as props
  // Code is the actual code required for the API call
  // Title is the explanation
  // Matches and isBar is required to provide relevant icon sizes for different uses.
  const sizeProvider = () => {
    if (isBar) {
      return 30;
    } else if (matches) {
      return 120;
    } else {
      return 80;
    }
  };

  return (
    <Image
      src={`https://openweathermap.org/img/wn/${code}@2x.png`}
      width={sizeProvider()}
      height={sizeProvider()}
      alt={title}
    />
  );
}
