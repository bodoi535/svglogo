import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Credits } from "#/components/canvas/Credits";
import { GridBackground } from "#/components/canvas/GridBackground";
import { LogoCanvas } from "#/components/canvas/LogoCanvas";
import { Dock } from "#/components/dock/Dock";
import { IconPickerModal } from "#/components/icon-picker/IconPickerModal";
import { useKbShortcut } from "#/hooks/useKbShortcut";
import { useLogoStore } from "#/store/logoStore";

export const Route = createFileRoute("/")({ component: Editor });

function Editor() {
	const openIconPicker = useLogoStore((s) => s.openIconPicker);

	useKbShortcut("i", openIconPicker);

	return (
		<div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
			<GridBackground />
			<Credits />
			<motion.div
				initial={{ opacity: 0, scale: 0.92, y: 16 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
			>
				<LogoCanvas />
			</motion.div>
			<Dock />
			<IconPickerModal />
		</div>
	);
}
