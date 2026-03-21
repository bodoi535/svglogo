import { LogoThumbnail } from "../LogoThumbnail";

export function SlackMockup() {
  return (
    <div className="flex rounded-xl bg-[#1a1d21] overflow-hidden">
      <div className="flex flex-col items-center gap-3 bg-[#1a1d21] border-r border-[#333] px-2 py-3">
        <LogoThumbnail size={32} shape="rounded" />
        <div className="size-8 rounded-lg bg-[#2c2c2c] flex items-center justify-center text-[10px] text-gray-500">A</div>
        <div className="size-8 rounded-lg bg-[#2c2c2c] flex items-center justify-center text-[10px] text-gray-500">B</div>
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-2 border-b border-[#333] px-3 py-2">
          <p className="text-sm font-bold text-white"># general</p>
        </div>
        <div className="flex flex-col gap-2 px-3 py-2">
          <div className="flex items-start gap-2">
            <div className="size-6 rounded bg-[#4a154b] shrink-0" />
            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] font-semibold text-white">teammate</p>
              <p className="text-[11px] text-gray-400">Hey, looking great!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
