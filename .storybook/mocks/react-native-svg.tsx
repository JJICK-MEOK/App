import React from 'react';

export const Svg = ({ width, height, viewBox, fill, children, ...props }: any) => (
  <svg width={width} height={height} viewBox={viewBox} fill={fill} {...props}>
    {children}
  </svg>
);

export const Path = (props: any) => <path {...props} />;
export const Circle = (props: any) => <circle {...props} />;
export const Rect = (props: any) => <rect {...props} />;
export const Line = (props: any) => <line {...props} />;
export const G = ({ children, ...props }: any) => <g {...props}>{children}</g>;
export const Defs = ({ children }: any) => <defs>{children}</defs>;
export const LinearGradient = ({ children, ...props }: any) => (
  <linearGradient {...props}>{children}</linearGradient>
);
export const Stop = (props: any) => <stop {...props} />;
export const ClipPath = ({ children, ...props }: any) => (
  <clipPath {...props}>{children}</clipPath>
);

export default Svg;
