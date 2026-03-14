"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { CollectionsButton } from "#/components/CollectionsButton";
import EditorPage from "#/components/EditorPage";
import FABs from "#/components/FABs";
import { ShareButton } from "#/components/ShareButton";
import UpdatesFab from "#/components/UpdatesFab";
import type { AppNotification } from "#/lib/notifications";
import { type LogoState, useLogoStore } from "#/store/logoStore";

const OnboardingTour = dynamic(() => import("#/components/OnboardingTour"), {
  ssr: false,
});

export default function DesktopAppShell({
  notification,
  sharedLogo,
}: {
  notification: AppNotification | null;
  sharedLogo?: LogoState | null;
}) {
  const set = useLogoStore((s) => s.set);
  const initialized = useRef(false);

  useEffect(() => {
    if (sharedLogo && !initialized.current) {
      set((d) => {
        Object.assign(d, sharedLogo);
      });
      initialized.current = true;
    }
  }, [sharedLogo, set]);

  return (
    <div className="hidden md:block">
      <OnboardingTour />
      <FABs />
      <div className="absolute bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
        <ShareButton />
        <CollectionsButton />
      </div>
      <EditorPage />
      <UpdatesFab notification={notification} />
    </div>
  );
}
