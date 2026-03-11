import { Icon } from "@iconify/react";
import { buildBackgroundCss } from "#/lib/canvasUtils";
import { getIconOutlineOffsets } from "#/lib/iconOutline";
import { useLogoStore } from "#/store/logoStore";

export function LogoCanvas() {
	const {
		iconName,
		iconColor,
		iconBorderColor,
		iconBorderWidth,
		iconSize,
		background,
		borderRadius,
		borderWidth,
		borderColor,
	} = useLogoStore((s) => s.present);

	const bgStyle = buildBackgroundCss(background);
	const iconPx = Math.round((iconSize / 100) * 512);
	const iconOutlineOffsets = getIconOutlineOffsets(iconBorderWidth);

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
			<div className="relative flex h-full w-full items-center justify-center">
				<div className="relative" style={{ width: iconPx, height: iconPx }}>
					{iconBorderWidth > 0
						? iconOutlineOffsets.map((offset) => (
								<Icon
									key={`${offset.x}-${offset.y}`}
									icon={iconName}
									width={iconPx}
									height={iconPx}
									color={iconBorderColor}
									style={{
										position: "absolute",
										inset: 0,
										transform: `translate(${offset.x}px, ${offset.y}px)`,
										display: "block",
										flexShrink: 0,
									}}
								/>
							))
						: null}
					<Icon
						icon={iconName}
						width={iconPx}
						height={iconPx}
						color={iconColor}
						style={{
							position: "absolute",
							inset: 0,
							display: "block",
							flexShrink: 0,
						}}
					/>
				</div>
			</div>
		</div>
	);
}
