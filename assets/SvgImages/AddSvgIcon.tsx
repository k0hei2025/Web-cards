import React, { FC } from "react";
import Svg, { Defs, Image, Path, Pattern, Use } from "react-native-svg";

const AddSvgIcon:FC=()=> {
  return (
    <Svg
      width="24"
      height="23"
      fill="none"
      viewBox="0 0 24 23"
    >
      <Path fill="url(#pattern0)" d="M0 0H24V23H0z"></Path>
      <Defs>
        <Pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <Use
            transform="matrix(.02 0 0 .02087 0 -.022)"
            xlinkHref="#image0_4_4"
          ></Use>
        </Pattern>
        <Image
          id="image0_4_4"
          width="50"
          height="50"
        ></Image>
      </Defs>
    </Svg>
  );
}

export default AddSvgIcon;