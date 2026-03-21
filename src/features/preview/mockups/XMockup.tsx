import { LogoThumbnail } from "../LogoThumbnail";

export function XMockup() {
  return (
    <div className="rounded-xl bg-black p-3">
      <div className="flex items-start gap-2.5">
        <LogoThumbnail size={40} shape="circle" />
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold text-white">Your App</p>
            <div className="size-3.5 rounded-full bg-blue-500 flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <p className="text-xs text-gray-500">@yourapp · 2h</p>
          </div>
          <p className="text-[13px] text-gray-300 leading-snug">Just shipped something new. Check it out!</p>
          <div className="flex items-center gap-6 mt-1.5">
            <div className="h-1.5 w-4 rounded-full bg-gray-700" />
            <div className="h-1.5 w-4 rounded-full bg-gray-700" />
            <div className="h-1.5 w-4 rounded-full bg-gray-700" />
            <div className="h-1.5 w-4 rounded-full bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
