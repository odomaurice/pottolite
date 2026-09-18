import type { ImageLoaderProps } from "next/image";


export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  const marker = "/image/upload/";
  const at = src.indexOf(marker);
  if (at === -1) return src;

  const head = src.slice(0, at + marker.length);
  const tail = src.slice(at + marker.length);
  return `${head}w_${width},c_limit,q_${quality ?? "auto"},f_auto/${tail}`;
}
