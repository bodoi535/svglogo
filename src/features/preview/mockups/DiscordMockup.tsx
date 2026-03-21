import { LogoThumbnail } from "../LogoThumbnail";

export function DiscordMockup() {
  return (
    <div className="flex rounded-xl bg-[#1e1f22] overflow-hidden">
      <div className="flex flex-col items-center gap-2 bg-[#1e1f22] px-1.5 py-3">
        <div className="size-10 rounded-full bg-[#5865f2] flex items-center justify-center">
          <svg width="16" height="12" viewBox="0 0 71 55" fill="white"><path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37 37 0 0025.4.3a.2.2 0 00-.2-.1 58.4 58.4 0 00-14.7 4.6.2.2 0 00-.1 0A60 60 0 00.4 43.8a.3.3 0 000 .2 58.7 58.7 0 0017.7 9 .2.2 0 00.3-.1 42 42 0 003.6-5.9.2.2 0 00-.1-.3 38.6 38.6 0 01-5.5-2.7.2.2 0 01 0-.4l1.1-.9a.2.2 0 01.2 0 42 42 0 0035.6 0 .2.2 0 01.2 0l1.1.9a.2.2 0 010 .4 36 36 0 01-5.5 2.6.2.2 0 00-.1.4 47 47 0 003.6 5.8.2.2 0 00.3.1 58.5 58.5 0 0017.7-9 .2.2 0 00.1-.1A59.5 59.5 0 0060.1 5a.1.1 0 000 0zM23.7 36c-3.3 0-6-3-6-6.7s2.7-6.7 6-6.7 6.1 3 6 6.7c0 3.7-2.6 6.7-6 6.7zm22.2 0c-3.3 0-6-3-6-6.7s2.6-6.7 6-6.7 6 3 6 6.7-2.6 6.7-6 6.7z"/></svg>
        </div>
        <LogoThumbnail size={40} shape="circle" />
        <div className="size-10 rounded-full bg-[#313338] flex items-center justify-center text-[11px] text-gray-500">S</div>
      </div>
      <div className="flex flex-col flex-1 min-w-0 border-l border-[#2b2d31]">
        <div className="flex items-center gap-1.5 border-b border-[#2b2d31] px-3 py-2">
          <span className="text-gray-500 text-sm">#</span>
          <p className="text-sm font-semibold text-white">general</p>
        </div>
        <div className="flex items-start gap-2 px-3 py-2">
          <div className="size-6 rounded-full bg-[#5865f2] shrink-0" />
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold text-white">friend</p>
            <p className="text-[11px] text-gray-400">Nice logo! 🔥</p>
          </div>
        </div>
      </div>
    </div>
  );
}
