import { useEffect, useRef } from "react";
import { toast } from "@heroui/react";
import { getVersionFn } from "#/server/version";

declare const __BUILD_HASH__: string;

export function useVersionCheck() {
	const toasted = useRef(false);

	useEffect(() => {
		const check = async () => {
			if (toasted.current) return;
			try {
				const { hash } = await getVersionFn();
				if (hash !== __BUILD_HASH__) {
					toasted.current = true;
					toast("A new version is available — refresh to update.", {
						timeout: 0
					});
				}
			} catch {
				// ignore network errors
			}
		};

		const onFocus = () => void check();
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible") onFocus();
		});

		return () => {
			document.removeEventListener("visibilitychange", onFocus);
		};
	}, []);
}
