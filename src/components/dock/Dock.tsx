import ArrowRotateLeft from "@gravity-ui/icons/ArrowRotateLeft";
import ArrowRotateRight from "@gravity-ui/icons/ArrowRotateRight";
import ArrowsExpand from "@gravity-ui/icons/ArrowsExpand";
import BucketPaint from "@gravity-ui/icons/BucketPaint";
import FaceSmile from "@gravity-ui/icons/FaceSmile";
import Frame from "@gravity-ui/icons/Frame";
import { Button, Popover, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { useLogo } from "#/hooks/useLogo";
import { useLogoStore } from "#/store/logoStore";
import { BgControl } from "./BgControl";
import { BorderControl } from "./BorderControl";
import { ExportMenu } from "./ExportMenu";
import { InlineColorPicker } from "./InlineColorPicker";
import { SliderControl } from "./SliderControl";

export function Dock() {
	const { undo, redo, canUndo, canRedo, iconColor, iconSize, set } = useLogo();
	const openIconPicker = useLogoStore((s) => s.openIconPicker);

	return (
		<div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
			<motion.div
				initial={{ opacity: 0, y: 72 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
				className="flex items-center gap-2 rounded-2xl border border-(--border) bg-(--surface)/90 px-3 py-2 shadow-xl backdrop-blur-xl"
			>
				{/* Undo / Redo */}
				<Tooltip>
					<Tooltip.Trigger>
						<Button
							isIconOnly
							variant="ghost"
							size="sm"
							isDisabled={!canUndo()}
							onPress={undo}
						>
							<ArrowRotateLeft width={16} height={16} />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p className="text-xs">Undo (⌘Z)</p>
					</Tooltip.Content>
				</Tooltip>

				<Tooltip>
					<Tooltip.Trigger>
						<Button
							isIconOnly
							variant="ghost"
							size="sm"
							isDisabled={!canRedo()}
							onPress={redo}
						>
							<ArrowRotateRight width={16} height={16} />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p className="text-xs">Redo (⌘⇧Z)</p>
					</Tooltip.Content>
				</Tooltip>

				<Divider />

				{/* Change Icon */}
				<Tooltip>
					<Tooltip.Trigger>
						<Button isIconOnly variant="ghost" onPress={openIconPicker}>
							<FaceSmile width={20} height={20} />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p className="text-xs">Change Icon</p>
					</Tooltip.Content>
				</Tooltip>

				{/* Icon Color */}
				<Tooltip>
					<Tooltip.Trigger>
						<InlineColorPicker
							value={iconColor}
							onChange={(c) =>
								set((d) => {
									d.iconColor = c;
								})
							}
						/>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p className="text-xs">Icon Color</p>
					</Tooltip.Content>
				</Tooltip>

				<Divider />

				<DockPopover
					label="Background"
					icon={<BucketPaint width={16} height={16} />}
				>
					<BgControl />
				</DockPopover>

				<DockPopover
					label="Border & Radius"
					icon={<Frame width={16} height={16} />}
				>
					<BorderControl />
				</DockPopover>

				<DockPopover
					label="Icon Size"
					icon={<ArrowsExpand width={16} height={16} />}
				>
					<SliderControl
						label="Icon Size"
						value={iconSize}
						min={10}
						max={90}
						unit="%"
						onChange={(v) =>
							set((d) => {
								d.iconSize = v;
							})
						}
					/>
				</DockPopover>

				<Divider />

				<ExportMenu />
			</motion.div>
		</div>
	);
}

function Divider() {
	return <div className="h-5 w-px bg-(--border) mx-1" />;
}

function DockPopover({
	label,
	icon,
	children,
}: {
	label: string;
	icon: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<Popover>
			<Tooltip>
				<Tooltip.Trigger>
					<Popover.Trigger>
						<Button isIconOnly variant="ghost" size="sm">
							{icon}
						</Button>
					</Popover.Trigger>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p className="text-xs">{label}</p>
				</Tooltip.Content>
			</Tooltip>
			<Popover.Content placement="top">
				<Popover.Dialog>{children}</Popover.Dialog>
			</Popover.Content>
		</Popover>
	);
}
