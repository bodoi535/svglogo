import { ICON_SETS } from "#/domain/icon/icon.types";
import { getRandomLogoVisual, getSmartLogoVisual } from "#/domain/logo/logo.randomizer";
import { fetchCollection } from "#/infra/iconify/iconify-client";
import { useLogoStore } from "#/store/logo-store";
import { updateLogo } from "./update-logo";

function randomPrefix(): string {
  return ICON_SETS[Math.floor(Math.random() * ICON_SETS.length)].id;
}

const iconCollectionCache = new Map<string, string[]>();

async function fetchAllIconsForPrefix(prefix: string): Promise<string[]> {
  const cached = iconCollectionCache.get(prefix);
  if (cached) return cached;

  const icons = await fetchCollection(prefix);
  iconCollectionCache.set(prefix, icons);
  return icons;
}

export interface RandomizeStats {
  total: number;
  smart: number;
  custom: number;
  icon: number;
  iconColor: number;
  background: number;
}

const STATS_KEY = "svglogo-randomize-stats";

export function getRandomizeStats(): RandomizeStats {
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY) ?? "{}");
  } catch {
    return { total: 0, smart: 0, custom: 0, icon: 0, iconColor: 0, background: 0 };
  }
}

function bumpStats(patch: Partial<RandomizeStats>) {
  const prev = getRandomizeStats();
  const next: RandomizeStats = {
    total: (prev.total ?? 0) + (patch.total ?? 0),
    smart: (prev.smart ?? 0) + (patch.smart ?? 0),
    custom: (prev.custom ?? 0) + (patch.custom ?? 0),
    icon: (prev.icon ?? 0) + (patch.icon ?? 0),
    iconColor: (prev.iconColor ?? 0) + (patch.iconColor ?? 0),
    background: (prev.background ?? 0) + (patch.background ?? 0),
  };
  localStorage.setItem(STATS_KEY, JSON.stringify(next));
}

export async function randomizeLogo(
  options:
    | { smart: true }
    | { smart?: false; icon: boolean; iconColor: boolean; background: boolean },
) {
  const { present } = useLogoStore.getState();
  const prefix = randomPrefix();
  const icons = await fetchAllIconsForPrefix(prefix);

  if (options.smart) {
    bumpStats({ total: 1, smart: 1 });
    const next = getSmartLogoVisual(icons, present.iconName);
    updateLogo((d) => {
      d.iconName = next.iconName;
      d.iconColor = next.iconColor;
      d.iconBorderWidth = next.iconBorderWidth;
      d.iconSize = next.iconSize;
      d.iconRotation = next.iconRotation;
      d.borderRadius = next.borderRadius;
      d.borderWidth = next.borderWidth;
      d.background = next.background;
    });
    return;
  }

  if (!options.icon && !options.iconColor && !options.background) return;

  bumpStats({
    total: 1,
    custom: 1,
    icon: options.icon ? 1 : 0,
    iconColor: options.iconColor ? 1 : 0,
    background: options.background ? 1 : 0,
  });

  const next = getRandomLogoVisual(icons, present.iconName);
  updateLogo((d) => {
    d.iconBorderWidth = 0;
    if (options.icon) d.iconName = next.iconName;
    if (options.iconColor) d.iconColor = next.iconColor;
    if (options.background) d.background = next.background;
  });
}
