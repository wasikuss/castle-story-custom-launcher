import type { Resolution } from "../../shared/types";

const commonHeights = [
  768,
  1080,
  1440,
  2160
];

const commonAspectRatios = [
  4/3,
  16/9,
  16/10,
  21/9,
  32/9
];

const aspectRatioToLabel = {
  [4/3]: "4:3",
  [16/9]: "16:9",
  [16/10]: "16:10",
  [21/9]: "21:9",
  [32/9]: "32:9",
};

export const getSupportedResolutins = () => {
  return commonHeights
    .flatMap(height => {
      return commonAspectRatios.map(aspectRatio => [Math.ceil(aspectRatio * height), height, aspectRatio])
    })
    .map(([width, height, aspect]): Resolution => {
      return {
        width,
        height,
        aspect,
        aspectLabel: aspectRatioToLabel[aspect]
      }
    });
}
