import { LogoThumbnail } from "../LogoThumbnail";

export function GooglePlayMockup() {
  return (
    <div className="rounded-xl bg-[#1f1f1f] p-4">
      <p className="text-sm font-medium text-white">Top charts</p>
      <div className="flex items-center gap-2 mt-2.5">
        <span className="rounded-full bg-[#2d4a2d] px-3 py-1 text-[11px] font-medium text-emerald-400">
          Top free
        </span>
        <span className="rounded-full border border-[#3a3a3a] px-3 py-1 text-[11px] text-gray-400">
          Top grossing
        </span>
        <span className="rounded-full border border-[#3a3a3a] px-3 py-1 text-[11px] text-gray-400">
          Top paid
        </span>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <span className="text-sm text-gray-400 w-4 text-center">1</span>
        <LogoThumbnail size={48} shape="rounded" />
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-medium text-white truncate">Your App</p>
          <p className="text-[11px] text-gray-500">Productivity</p>
          <p className="text-[11px] text-gray-500">4.6 ★</p>
        </div>
      </div>
    </div>
  );
}
