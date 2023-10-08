import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChatIcon = ({ width, height, fill, stroke, strokeWidth, strokeLinecap }) => (
  <Svg width={width} height={height} viewBox="0 0 512 512">
    <Path
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7z"
    />
  </Svg>
);

export default ChatIcon;
