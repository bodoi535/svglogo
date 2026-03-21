import { LogoThumbnail } from "../LogoThumbnail";

export function GitHubMockup() {
  return (
    <div className="rounded-xl bg-[#0d1117] p-3">
      <div className="flex items-center gap-2.5">
        <LogoThumbnail size={36} shape="circle" />
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-semibold text-[#58a6ff]">yourapp/yourapp</p>
          <p className="text-[11px] text-gray-500">A beautifully crafted open-source tool</p>
        </div>
        <div className="ml-auto flex items-center gap-1 shrink-0 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-0.5">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="#8b949e"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>
          <span className="text-[11px] text-gray-400">2.4k</span>
        </div>
      </div>
    </div>
  );
}
