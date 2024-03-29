import * as React from 'react';
import { SVGProps } from 'react';
const MarkerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill={props.color}
      d="M12 11.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"
    />
  </svg>
);
export default MarkerIcon;
