import { useEffect } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type RouteSeoProps = {
  title: string;
  description: string;
  path: string;
  faq?: FaqItem[];
};

const SITE_URL = "https://svglogo.dev";
const DEFAULT_OG_IMAGE = "https://svglogo.dev/og/banner.png";

function upsertMetaByName(name: string, content: string) {
  let tag = document.head.querySelector(
    `meta[name="${CSS.escape(name)}"]`,
  ) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertMetaByProperty(property: string, content: string) {
  let tag = document.head.querySelector(
    `meta[property="${CSS.escape(property)}"]`,
  ) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertCanonical(href: string) {
  let tag = document.head.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement | null;
  if (!tag) {
    tag = document.createElement("link");
    tag.rel = "canonical";
    document.head.appendChild(tag);
  }
  tag.href = href;
}

function upsertFaqJsonLd(faq: FaqItem[] | undefined) {
  const id = "route-faq-jsonld";
  const existing = document.getElementById(id);

  if (!faq || faq.length === 0) {
    existing?.remove();
    return;
  }

  const script =
    existing instanceof HTMLScriptElement
      ? existing
      : document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });

  if (!existing) {
    document.head.appendChild(script);
  }
}

export function RouteSeo({ title, description, path, faq }: RouteSeoProps) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path}`;

    document.title = title;
    upsertMetaByName("description", description);
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:url", canonical);
    upsertMetaByProperty("og:image", DEFAULT_OG_IMAGE);
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", description);
    upsertMetaByName("twitter:image", DEFAULT_OG_IMAGE);
    upsertCanonical(canonical);
    upsertFaqJsonLd(faq);
  }, [description, faq, path, title]);

  return null;
}
