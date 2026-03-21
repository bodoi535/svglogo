import { LogoThumbnail } from "../LogoThumbnail";

export function FaviconMockup() {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center rounded-t-lg bg-[#2b2b2b] px-2 pt-2">
        <div className="flex items-center gap-2 rounded-t-md bg-[#3c3c3c] px-3 py-1.5 max-w-[140px]">
          <LogoThumbnail size={14} shape="square" />
          <p className="text-[11px] text-gray-300 truncate">yourapp.com</p>
        </div>
        <div className="ml-1 rounded-t-md bg-[#333] px-3 py-1.5">
          <div className="size-2 rounded-full bg-gray-500" />
        </div>
      </div>
      <div className="flex items-center gap-2 bg-[#3c3c3c] px-3 py-1.5 rounded-b-lg">
        <div className="h-1 w-3 rounded-full bg-gray-500" />
        <div className="h-1 w-3 rounded-full bg-gray-500" />
        <div className="flex-1 rounded-md bg-[#505050] px-2 py-1">
          <p className="text-[9px] text-gray-400">yourapp.com</p>
        </div>
      </div>
    </div>
  );
}
