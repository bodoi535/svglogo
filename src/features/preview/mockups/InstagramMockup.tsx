import { LogoThumbnail } from "../LogoThumbnail";

export function InstagramMockup() {
  return (
    <div className="rounded-xl bg-black p-3">
      <div className="flex items-center gap-2.5">
        <div className="rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
          <div className="rounded-full bg-black p-[2px]">
            <LogoThumbnail size={36} shape="circle" />
          </div>
        </div>
        <div className="flex flex-col gap-0 min-w-0">
          <p className="text-sm font-semibold text-white">yourapp</p>
          <p className="text-[11px] text-gray-500">Your App</p>
        </div>
        <div className="ml-auto shrink-0 rounded-lg bg-[#0095f6] px-4 py-1 text-[11px] font-semibold text-white">
          Follow
        </div>
      </div>
      <div className="mt-2.5 h-28 rounded-md bg-[#1a1a1a] flex items-center justify-center">
        <div className="flex gap-3">
          <div className="flex flex-col items-center gap-0.5">
            <p className="text-sm font-semibold text-white">142</p>
            <p className="text-[9px] text-gray-500">posts</p>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <p className="text-sm font-semibold text-white">12.4k</p>
            <p className="text-[9px] text-gray-500">followers</p>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <p className="text-sm font-semibold text-white">89</p>
            <p className="text-[9px] text-gray-500">following</p>
          </div>
        </div>
      </div>
    </div>
  );
}
