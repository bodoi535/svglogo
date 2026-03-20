import { Modal } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { getRandomizeStats, type RandomizeStats } from "#/commands/logo/randomize-logo";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ROWS: { label: string; key: keyof RandomizeStats }[] = [
  { label: "Total randomizes", key: "total" },
  { label: "Smart randomizes", key: "smart" },
  { label: "Custom randomizes", key: "custom" },
  { label: "Icons randomized", key: "icon" },
  { label: "Icon colors randomized", key: "iconColor" },
  { label: "Backgrounds randomized", key: "background" },
  { label: "Fonts randomized", key: "font" },
  { label: "In text mode", key: "textMode" },
];

export function StatsModal({ isOpen, onClose }: Props) {
  const [stats, setStats] = useState<RandomizeStats | null>(null);

  useEffect(() => {
    if (isOpen) setStats(getRandomizeStats());
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Modal.Backdrop isDismissable>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Body>
              <p className="text-base font-semibold">Your Stats</p>
              <p className="text-xs text-muted mb-4">Saved locally on this device</p>

              <div className="flex flex-col gap-1">
                {ROWS.map(({ label, key }) => (
                  <div key={key} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <span className="text-sm text-muted">{label}</span>
                    <span className="text-sm font-semibold tabular-nums">{stats?.[key] ?? 0}</span>
                  </div>
                ))}
              </div>

              <a
                href={`https://x.com/intent/post?text=${encodeURIComponent(`Made my logo with svglogo.dev 🔥 — randomized ${stats?.total ?? 0} times, tried ${stats?.icon ?? 0} icons & ${stats?.background ?? 0} backgrounds. @monawwarx`)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="stats share on x"
                className="mt-5 flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs text-muted transition-colors hover:text-foreground"
              >
                <Icon icon="simple-icons:x" width={12} className="shrink-0" />
                <span>Enjoying it? Share your logo and tag <span className="font-medium text-foreground">@monawwarx</span> — I'd love to see it!</span>
              </a>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
