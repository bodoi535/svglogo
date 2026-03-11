import { Icon } from "@iconify/react";
import { buildBackgroundCss } from "#/lib/canvasUtils";
import { useLogoStore } from "#/store/logoStore";

export function LogoCanvas() {
	const {
		iconName,
		iconColor,
		iconSize,
		background,
		borderRadius,
		borderWidth,
		borderColor,
	} = useLogoStore((s) => s.present);

	const bgStyle = buildBackgroundCss(background);
	const iconPx = Math.round((iconSize / 100) * 512);

	return (
		<div
			className="relative shrink-0 shadow-2xl shadow-black/50"
			style={{
				width: 512,
				height: 512,
				borderRadius,
				overflow: "hidden",
				...bgStyle,
				...(borderWidth > 0
					? {
							boxShadow: `inset 0 0 0 ${borderWidth}px ${borderColor}, 0 32px 64px rgba(0,0,0,0.5)`,
						}
					: { boxShadow: "0 32px 64px rgba(0,0,0,0.5)" }),
			}}
		>
			<div className="flex h-full w-full items-center justify-center">
				<Icon
					icon={iconName}
					width={iconPx}
					height={iconPx}
					color={iconColor}
					style={{ display: "block", flexShrink: 0 }}
				/>
			</div>
		</div>
	);
}
