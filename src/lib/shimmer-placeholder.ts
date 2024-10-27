import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#8e95a9 " offset="20%" />
      <stop stop-color="#c3c8d4" offset="50%" />
      <stop stop-color="#8e95a9 " offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#8e95a9 " />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

export const placeholder: PlaceholderValue = `data:image/svg+xml;base64,${toBase64(
  shimmer(700, 475)
)}`;


// const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;