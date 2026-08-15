// Slurpy bowl mark (legacy component name kept from the Slurpy fork so call
// sites are unchanged). Waveform steam over a ramen bowl.
const SlurpyBowl = ({
  width,
  height,
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <svg
    width={width || 126}
    height={height || 135}
    viewBox="0 0 64 64"
    className="fill-text stroke-text"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 34 h52 a26 26 0 0 1 -52 0 z" stroke="none" />
    <rect x="26" y="58" width="12" height="4" stroke="none" />
    <path
      d="M18 12 c4 6 -4 12 0 18 M32 4 c4 8 -4 16 0 24 M46 15 c4 5 -4 10 0 15"
      fill="none"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

export default SlurpyBowl;
