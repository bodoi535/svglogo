import { buildBackgroundCss } from "#/domain/logo/logo.svg-builder";
import { useLogoSvg } from "#/queries/logo/use-logo-svg";
import { useLogoState } from "#/queries/logo/use-logo-state";
import type { Platform } from "#/data/platforms";

const SHAPE_CLASSES: Record<Platform["shape"], string> = {
  circle: "rounded-full",
  squircle: "rounded-[22%]",
  rounded: "rounded-lg",
  square: "rounded-sm",
};

export function LogoThumbnail({ size, shape }: { size: number; shape: Platform["shape"] }) {
  const present = useLogoState();
  const svg = useLogoSvg();
  const bgStyle = buildBackgroundCss(present.background);

  // Strip explicit width/height from SVG so it scales to container via CSS
  const scaledSvg = svg
    .replace(/\bwidth="[^"]*"/, `width="100%"`)
    .replace(/\bheight="[^"]*"/, `height="100%"`);

  return (
    <div
      className={`shrink-0 overflow-hidden ${SHAPE_CLASSES[shape]}`}
      style={{
        width: size,
        height: size,
        ...bgStyle,
        ...(present.borderWidth > 0
          ? { boxShadow: `inset 0 0 0 ${Math.max(1, present.borderWidth * (size / 512))}px ${present.borderColor}` }
          : {}),
      }}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: rendering the SVG
      dangerouslySetInnerHTML={{ __html: scaledSvg }}
    />
  );
}
