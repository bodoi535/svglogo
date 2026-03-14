import DesktopAppShell from "#/components/DesktopAppShell";
import DesktopOnlyNotice from "#/components/DesktopOnlyNotice";
import { fetchLatestNotification } from "#/lib/notifications";
import { redis } from "#/lib/redis";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  searchParams: Promise<{ s?: string }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const s = searchParams.s;
  
  if (!s) return {};

  const ogImageUrl = `https://svglogo.dev/api/og?s=${s}`;

  return {
    openGraph: {
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 675,
          alt: "Custom Logo on SVGLogo.dev",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImageUrl],
    },
  };
}

export default async function Home(props: {
  searchParams: Promise<{ s?: string }>;
}) {
  const searchParams = await props.searchParams;
  const shareId = searchParams.s;
  let sharedLogo = null;

  if (shareId) {
    try {
      const data = await redis.get(`share:${shareId}`);
      if (data) {
        sharedLogo = JSON.parse(data);
      }
    } catch (error) {
      console.error("Failed to fetch shared logo:", error);
    }
  }

  const notification = await fetchLatestNotification();

  return (
    <>
      <DesktopOnlyNotice />
      <DesktopAppShell notification={notification} sharedLogo={sharedLogo} />
    </>
  );
}
