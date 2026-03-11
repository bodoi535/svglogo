import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export function Credits() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
			className="pointer-events-auto absolute bottom-3 left-3 z-10 flex flex-col"
		>
			<a
				href="https://x.com/monawwarx"
				target="_blank"
				rel="noreferrer"
				className="group opacity-40 hover:opacity-60 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-foreground backdrop-blur-sm transition"
				aria-label="Credits: Monawwar"
			>
				<Icon
					icon="simple-icons:x"
					width={12}
					height={12}
					className="opacity-80 transition group-hover:opacity-100"
				/>
				<span className="underline decoration-white/25 underline-offset-2 transition group-hover:decoration-white/60">
					@monawwarx
				</span>
			</a>
			<a
				href="https://icon-sets.iconify.design/"
				target="_blank"
				rel="noreferrer"
				className="group opacity-40 hover:opacity-60 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-foreground backdrop-blur-sm transition"
				aria-label="Credits: Iconify"
			>
				<Icon
					icon="simple-icons:iconify"
					width={12}
					height={12}
					className="opacity-80 transition group-hover:opacity-100"
				/>
				<span className="underline decoration-white/25 underline-offset-2 transition group-hover:decoration-white/60">
					Iconify
				</span>
			</a>
		</motion.div>
	);
}
