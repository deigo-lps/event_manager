import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const Back = ({width, height, fill}) => {
  return (
    <View>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={width} height={height} fill={fill}>
        <Path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      </Svg>
    </View>
  );
};

export default Back;
