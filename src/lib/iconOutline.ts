export interface IconOutlineOffset {
	x: number;
	y: number;
}

export function getIconOutlineOffsets(width: number): IconOutlineOffset[] {
	const w = Math.max(0, Math.round(width));
	if (w <= 0) return [];

	const rings = Array.from(
		new Set([
			w,
			Math.max(1, Math.round(w * 0.66)),
			Math.max(1, Math.round(w * 0.33)),
		]),
	);

	const offsetSet = new Set<string>();
	for (const radius of rings) {
		const steps = Math.max(12, Math.round((2 * Math.PI * radius) / 3));
		for (let i = 0; i < steps; i++) {
			const angle = (i / steps) * Math.PI * 2;
			const x = Math.round(Math.cos(angle) * radius);
			const y = Math.round(Math.sin(angle) * radius);
			offsetSet.add(`${x},${y}`);
		}
	}

	offsetSet.delete("0,0");

	return Array.from(offsetSet, (key) => {
		const [x, y] = key.split(",").map(Number);
		return { x, y };
	});
}
