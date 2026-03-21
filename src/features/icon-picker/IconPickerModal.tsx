import {
  Label,
  ListBox,
  Modal,
  SearchField,
  Select,
  Separator,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { ICON_SETS, FREE_ICON_SETS } from "#/domain/icon/icon.types";
import { selectIcon } from "#/commands/icon/select-icon";
import { useIconSearch } from "#/queries/icon/use-icon-search";
import { useGlobalIconSearch } from "#/queries/icon/use-global-icon-search";
import { useLogoStore } from "#/store/logo-store";
import { useAuth } from "#/queries/auth/use-auth";
import { openUpgradeModal } from "#/commands/upgrade/open-upgrade-modal";
import { IconGrid } from "./IconGrid";

export function IconPickerModal() {
  const user = useAuth();
  const isCreator = user?.plan === "creator";
  const isOpen = useLogoStore((s) => s.iconPickerOpen);
  const closeIconPicker = useLogoStore((s) => s.closeIconPicker);
  const iconName = useLogoStore((s) => s.present.iconName);
  const prefix = useLogoStore((s) => s.selectedIconPrefix);
  const setSelectedIconPrefix = useLogoStore((s) => s.setSelectedIconPrefix);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isGlobalSearch, setIsGlobalSearch] = useState(false);

  useEffect(() => {
    setIsGlobalSearch(false);
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const { data: prefixIcons = [], isFetching: isFetchingPrefix } =
    useIconSearch(debouncedQuery, prefix);

  const globalPrefixes = isCreator ? undefined : FREE_ICON_SETS.map((s) => s.id);
  const { data: globalIcons = [], isFetching: isFetchingGlobal } =
    useGlobalIconSearch(debouncedQuery, isGlobalSearch, globalPrefixes);

  const icons = isGlobalSearch ? globalIcons : prefixIcons;
  const isFetching = isGlobalSearch ? isFetchingGlobal : isFetchingPrefix;

  const handleSelect = (name: string) => {
    selectIcon(name);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) closeIconPicker();
      }}
    >
      <Modal.Backdrop isDismissable variant="transparent">
        <Modal.Container size="lg">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Choose Icon</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>

            <Modal.Body className="p-0 overflow-visible">
              <div className="flex items-center gap-2 pt-3 px-3">
                <SearchField
                  autoFocus={
                    typeof window !== "undefined" && window.innerWidth >= 768
                  }
                  variant="secondary"
                  value={query}
                  onChange={setQuery}
                  className="flex-1 min-w-0"
                  aria-label="Search icons"
                >
                  <SearchField.Group>
                    <SearchField.SearchIcon>
                      <Icon icon="lucide:search" width={16} />
                    </SearchField.SearchIcon>
                    <SearchField.Input placeholder="Search icons..." />
                    <SearchField.ClearButton />
                  </SearchField.Group>
                </SearchField>

                <Select
                  selectedKey={prefix}
                  onSelectionChange={(key) => {
                    const set = ICON_SETS.find((s) => s.id === key);
                    if (set?.premium && !isCreator) {
                      openUpgradeModal();
                      return;
                    }
                    setSelectedIconPrefix(key as string);
                  }}
                  className="w-32 md:w-40 shrink-0"
                  aria-label="Icon set"
                  variant="secondary"
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover placement="bottom end" shouldFlip>
                    <ListBox>
                      {ICON_SETS.map((s) => (
                        <ListBox.Item key={s.id} id={s.id} className={s.premium && !isCreator ? "opacity-50" : ""}>
                          <Label>{s.label}</Label>
                          {s.premium && !isCreator && (
                            <span className="text-[9px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full ml-auto">
                              PRO
                            </span>
                          )}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <Separator
                className="my-4"
                orientation="horizontal"
                variant="secondary"
              />

              <div className="px-3 py-1">
                <p className="text-xs text-muted">
                  {isFetching
                    ? "Loading..."
                    : isGlobalSearch
                      ? `${icons.length} icons across all sets`
                      : `${icons.length} icons`}
                </p>
              </div>

              <div className="h-95">
                <IconGrid
                  icons={icons}
                  isLoading={isFetching && icons.length === 0}
                  selected={iconName}
                  onSelect={handleSelect}
                  query={debouncedQuery}
                  isGlobalSearch={isGlobalSearch}
                  onGlobalSearch={() => setIsGlobalSearch(true)}
                />
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
