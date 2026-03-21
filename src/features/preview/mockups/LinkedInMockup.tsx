import { LogoThumbnail } from "../LogoThumbnail";

export function LinkedInMockup() {
  return (
    <div className="rounded-xl bg-white p-3">
      <div className="flex items-center gap-2.5">
        <LogoThumbnail size={44} shape="square" />
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-semibold text-gray-900">Your App</p>
          <p className="text-[11px] text-gray-500">1,234 followers · Software</p>
        </div>
        <div className="ml-auto shrink-0 flex items-center gap-1 rounded-full border border-blue-600 px-3 py-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          <span className="text-[11px] font-semibold text-blue-600">Follow</span>
        </div>
      </div>
    </div>
  );
}
