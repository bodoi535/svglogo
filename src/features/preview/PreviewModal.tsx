import { Modal } from "@heroui/react";
import { AppStoreMockup } from "./mockups/AppStoreMockup";
import { GooglePlayMockup } from "./mockups/GooglePlayMockup";
import { FaviconMockup } from "./mockups/FaviconMockup";
import { XMockup } from "./mockups/XMockup";
import { SlackMockup } from "./mockups/SlackMockup";
import { DiscordMockup } from "./mockups/DiscordMockup";
import { GitHubMockup } from "./mockups/GitHubMockup";
import { InstagramMockup } from "./mockups/InstagramMockup";
import { LinkedInMockup } from "./mockups/LinkedInMockup";
import { IOSHomeScreenMockup } from "./mockups/IOSHomeScreenMockup";
import { PLATFORMS } from "#/data/platforms";

const MOCKUP_MAP: Record<string, () => React.JSX.Element> = {
  "ios-home": IOSHomeScreenMockup,
  "app-store": AppStoreMockup,
  "google-play": GooglePlayMockup,
  favicon: FaviconMockup,
  x: XMockup,
  slack: SlackMockup,
  discord: DiscordMockup,
  github: GitHubMockup,
  instagram: InstagramMockup,
  linkedin: LinkedInMockup,
};

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreviewModal({ isOpen, onClose }: PreviewModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Preview</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4">
                {PLATFORMS.map((p) => {
                  const Mockup = MOCKUP_MAP[p.id];
                  if (!Mockup) return null;
                  return (
                    <div key={p.id} className="flex flex-col gap-1.5">
                      <p className="text-xs font-medium text-muted">{p.label}</p>
                      <Mockup />
                    </div>
                  );
                })}
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
