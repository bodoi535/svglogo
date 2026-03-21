import { LogoThumbnail } from "../LogoThumbnail";

export function AppStoreMockup() {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
      <LogoThumbnail size={64} shape="squircle" />
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">Your App</p>
        <p className="text-[10px] text-gray-400">Productivity</p>
        <div className="flex items-center gap-0.5 mt-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`size-2 rounded-full ${i < 4 ? "bg-yellow-400" : "bg-gray-200"}`} />
          ))}
        </div>
      </div>
      <div className="ml-auto shrink-0 rounded-full bg-blue-500 px-4 py-1 text-[11px] font-semibold text-white">
        GET
      </div>
    </div>
  );
}
