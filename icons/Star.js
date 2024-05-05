import { Path, Svg } from "react-native-svg";

export default function Star({ width, height, stroke, fill, style }) {
  return (
    <Svg style={style} width={width} height={height} viewBox="0 0 22 22" stroke={stroke} fill={fill}>
      <Path
        d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
