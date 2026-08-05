import { useState } from "react";
import { asset } from "../lib/asset";

const PALETTE = [
  { bg: "#E8F6FD", fg: "#11567F" },
  { bg: "#EEEBFB", fg: "#5B4BD1" },
  { bg: "#E7F3F4", fg: "#1F7A86" },
  { bg: "#FDF3E6", fg: "#C77B10" },
  { bg: "#EAF1FE", fg: "#2B6CE6" },
  { bg: "#EEF1F5", fg: "#5B6B7A" },
];

function pick(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

/**
 * Team/org logo. The tile (white, rounded, ring) is drawn here so every logo
 * has an identical footprint; the image/monogram sits inside with uniform
 * padding regardless of the source asset's own margins.
 */
export default function OrgLogo({
  org,
  src,
  size = 30,
}: {
  org: string;
  src?: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const resolved = src ? asset(src) : undefined;
  const showImg = resolved && !failed;
  const { fg } = pick(org);
  const letter = (org.trim()[0] || "?").toUpperCase();

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-white ring-1 ring-line"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {showImg ? (
        <img
          src={resolved}
          alt=""
          className="object-contain"
          style={{ width: "74%", height: "74%" }}
          onError={() => setFailed(true)}
          draggable={false}
        />
      ) : (
        <span
          style={{ color: fg, fontSize: size * 0.46 }}
          className="font-display font-extrabold leading-none"
        >
          {letter}
        </span>
      )}
    </span>
  );
}
