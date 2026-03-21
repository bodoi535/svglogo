import { LogoThumbnail } from "../LogoThumbnail";

export function GooglePlayMockup() {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#1f1f1f] p-3 shadow-sm">
      <LogoThumbnail size={56} shape="rounded" />
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-sm font-medium text-white truncate">Your App</p>
        <p className="text-[10px] text-gray-400">4.5 ★ · Tools</p>
      </div>
      <div className="ml-auto shrink-0 rounded-md bg-emerald-600 px-3 py-1 text-[11px] font-medium text-white">
        Install
      </div>
    </div>
  );
}
