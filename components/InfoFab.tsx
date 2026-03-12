"use client";

import { Button, Modal } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function InfoFab() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { action: "Undo", shortcut: "⌘ + Z" },
    { action: "Redo", shortcut: "⌘ + ⇧ + Z" },
    { action: "Randomize", shortcut: "R" },
    { action: "Open Icon Picker", shortcut: "I" },
    { action: "Copy SVG JSON", shortcut: "⇧ + C" },
    { action: "Paste SVG JSON", shortcut: "⇧ + V" },
  ];

  const open = () => setIsOpen(true);
  const dismiss = () => setIsOpen(false);

  return (
    <>
      <Button
        aria-label="Show info"
        onClick={open}
        className="fixed bottom-6 right-6 z-10"
        isIconOnly
        variant="outline"
        size="lg"
      >
        <Icon icon="lucide:info" width={28} height={28} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) dismiss();
        }}
      >
        <Modal.Backdrop isDismissable>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>SVGLogo</Modal.Heading>
                <Modal.CloseTrigger />
              </Modal.Header>
              <Modal.Body>
                <p>
                  Generate clean icon-based logos instantly in your browser.
                  Export as SVG, PNG, or ICO.
                </p>

                <h1 className="mt-4 mb-2 font-semibold">Keyboard Shortcuts</h1>
                <div className="flex flex-col gap-2 mt-2">
                  {shortcuts.map((s) => (
                    <div
                      key={s.action}
                      className="flex justify-between items-center text-sm text-muted"
                    >
                      <span>{s.action}</span>
                      <span className=" text-sm">{s.shortcut}</span>
                    </div>
                  ))}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onPress={dismiss}>Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
