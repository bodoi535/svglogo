"use client";

import { Button, Modal } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function InfoFab() {
  const [isOpen, setIsOpen] = useState(false);

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

                <h1 className="mt-4 mb-2 text-lg font-semibold">
                  Keyboard Shortcuts
                </h1>
                <ul className="prose prose-sm dark:prose-invert max-w-none text-sm text-muted list-disc pl-6">
                  <li>
                    <b>Undo:</b> ⌘Z
                  </li>
                  <li>
                    <b>Redo:</b> ⌘⇧Z
                  </li>
                  <li>
                    <b>Randomize:</b> R
                  </li>
                  <li>
                    <b>Export:</b> E
                  </li>
                  <li>
                    <b>Open Icon Picker:</b> I
                  </li>
                </ul>
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
