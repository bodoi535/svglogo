import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { CreatorPlanModal } from "./CreatorPlanModal";

export function CreatorPlanButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pointer-events-auto">
      <CreatorPlanModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Button size="lg" onPress={() => setIsOpen(true)} data-umami-event="open creator plan modal">
        <Icon icon="lucide:crown" width={16} height={16} className="text-primary" />
        Creator Plan
      </Button>
    </div>
  );
}
