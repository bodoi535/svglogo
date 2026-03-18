import { Button, Popover, TextArea, Tooltip } from "@heroui/react";
import { useState } from "react";
import { createFeedbackFn } from "#/server/feedback.create";
import { trackEvent } from "#/lib/analytics";
import { Comment } from "@gravity-ui/icons";

type Status = "idle" | "loading" | "success" | "error";

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async () => {
    if (!message.trim() || status === "loading") return;
    setStatus("loading");
    try {
      await createFeedbackFn({ data: { message } });
      setStatus("success");
      setMessage("");
      trackEvent("submit feedback");
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
      }, 1500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) { setMessage(""); setStatus("idle"); }
      }}
    >
      <Tooltip delay={300}>
        <Tooltip.Trigger>
          <Popover.Trigger>
            <Button variant="outline" aria-label="Send feedback" data-umami-event="open feedback">
              <Comment width={18} height={18} />
              Feedback
            </Button>
          </Popover.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Content placement="left">
          <p className="text-xs">What's missing?</p>
        </Tooltip.Content>
      </Tooltip>

      <Popover.Content placement="left">
        <Popover.Dialog>
          <div className="flex w-72 flex-col gap-3">
            <p className="text-sm font-medium">Send feedback</p>
            <p className="text-xs text-muted">Any bugs, ideas, or requests?</p>
            <TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your feedback..."
              rows={4}
              className="resize-none"
              variant="secondary"
              autoFocus
            />
            <Button
              size="sm"
              onPress={() => void submit()}
              isDisabled={!message.trim() || status === "loading" || status === "success" || status === "error"}
              className="w-full"
            >
              {status === "loading" ? "Sending…" : status === "success" ? "Sent!" : status === "error" ? "Try again later" : "Send"}
            </Button>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
