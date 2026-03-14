"use client";

import {
  ArrowShapeTurnUpRight,
  Check,
  Copy,
  NodesRight,
} from "@gravity-ui/icons";
import { Button, Input, Modal, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { trackEvent } from "#/lib/analytics";
import { useLogoStore } from "#/store/logoStore";

export function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const logo = useLogoStore((s) => s.present);

  const open = () => {
    setIsOpen(true);
    trackEvent("open share modal");
  };
  const dismiss = () => setIsOpen(false);

  useEffect(() => {
    const generateLink = async () => {
      try {
        // Generate short link via API
        const shareRes = await fetch("/api/share", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ logoState: logo }),
        });
        const { id } = await shareRes.json();
        const newShareUrl = `${window.location.origin}?s=${id}`;
        setShareUrl(newShareUrl);
      } catch (error) {
        console.error("Failed to generate share link:", error);
      }
    };

    if (isOpen) {
      generateLink();
    } else {
      setShareUrl(null);
      setCopied(false);
    }
  }, [isOpen, logo]);

  const copyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    trackEvent("copy share link");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareOnX = () => {
    if (!shareUrl) return;
    const text = encodeURIComponent(
      `Check out the logo I made with @svglogo_dev! 🎨✨\n\nEdit here: ${shareUrl}`,
    );
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    trackEvent("share on x");
    window.open(url, "_blank");
  };

  return (
    <>
      <Tooltip delay={0}>
        <Button size="lg" onPress={open} variant="outline">
          <ArrowShapeTurnUpRight width={18} height={18} />
          Share
        </Button>
        <Tooltip.Content placement="left">
          <p>Share your logo</p>
        </Tooltip.Content>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) dismiss();
        }}
      >
        <Modal.Backdrop isDismissable>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-default text-foreground">
                  <NodesRight className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Share your work</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    Anyone with this link can view and edit a copy of this logo.
                  </p>
                  <div className="flex gap-2 w-full items-center overflow-visible">
                    <div className="relative flex-1 min-w-0 overflow-visible">
                      <Input
                        readOnly
                        value={shareUrl || "Generating link..."}
                        variant="secondary"
                        fullWidth
                        className={"focus:ring-inset"}
                      />
                    </div>
                    <Button
                      isIconOnly
                      onPress={copyLink}
                      isDisabled={!shareUrl}
                      variant="ghost"
                      className="min-w-10 h-10"
                    >
                      {copied ? <Check width={18} /> : <Copy width={18} />}
                    </Button>
                  </div>
                </div>

                <p className="mt-2">
                  <strong>Pro tip:</strong> Get a retweet by sharing on X!
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="ghost"
                  onPress={handleShareOnX}
                  isDisabled={!shareUrl}
                  className="gap-2"
                >
                  <Icon icon="simple-icons:x" width={14} />
                  Share on X
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
