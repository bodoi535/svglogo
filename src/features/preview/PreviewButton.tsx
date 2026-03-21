import { Button, Tooltip } from "@heroui/react";
import { Eye } from "@gravity-ui/icons";
import { useState } from "react";
import { PreviewModal } from "./PreviewModal";

export function PreviewButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <Tooltip.Trigger tabIndex={-1}>
          <Button
            variant="outline"
            size="lg"
            aria-label="Preview"
            onPress={() => setOpen(true)}
            data-umami-event="preview opened"
          >
            <Eye width={16} height={16} />
            Preview
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content placement="left">
          <p className="text-xs">Preview</p>
        </Tooltip.Content>
      </Tooltip>
      <PreviewModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
