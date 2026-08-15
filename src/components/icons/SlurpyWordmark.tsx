import React from "react";

// Slurpy wordmark: the ramen-bowl mark plus the app name. Keeps the legacy
// component name so call sites are unchanged (this fork was renamed from
// Slurpy; see README).
const SlurpyWordmark = ({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 340 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* bowl */}
      <path
        d="M8 52 h72 a36 36 0 0 1 -72 0 z"
        className="logo-primary"
      />
      <rect x="36" y="86" width="16" height="6" className="logo-primary" />
      {/* waveform steam */}
      <path
        d="M26 20 c6 8 -6 16 0 24 M44 8 c6 10 -6 20 0 32 M62 24 c6 7 -6 14 0 20"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Brand name, deliberately untranslated */}
      {/* eslint-disable i18next/no-literal-string */}
      <text
        x="100"
        y="74"
        fontSize="62"
        fontWeight="800"
        fontFamily="inherit"
        className="logo-primary"
      >
        Slurpy
      </text>
      {/* eslint-enable i18next/no-literal-string */}
    </svg>
  );
};

export default SlurpyWordmark;
