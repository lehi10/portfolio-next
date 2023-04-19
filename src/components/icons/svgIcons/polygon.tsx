import * as React from 'react';
import { SVGProps } from 'react';
const PolygonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <path fill="url(#a)" d="M0 0h30v30H0z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.01042)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={96}
        height={96}
      />
    </defs>
  </svg>
);
export default PolygonIcon;
