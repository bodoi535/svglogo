import { createServerFn } from "@tanstack/react-start";

declare const __BUILD_HASH__: string;

export const getVersionFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return { hash: __BUILD_HASH__ };
	},
);
