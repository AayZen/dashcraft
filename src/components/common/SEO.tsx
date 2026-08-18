import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

const CANONICAL_ORIGIN = "https://dashcraft-five.vercel.app";

/**
 * Lightweight SEO head manager for React SPA.
 * Updates document title, meta tags, canonical link, and JSON-LD on mount/update.
 * Cleans up dynamic tags on unmount.
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  ogType = "website",
  ogImage = "/brand/og-image.jpg",
  noindex = false,
  schema,
}) => {
  useEffect(() => {
    const canonicalUrl = `${CANONICAL_ORIGIN}${canonicalPath}`;
    const ogImageUrl = ogImage.startsWith("http")
      ? ogImage
      : `${CANONICAL_ORIGIN}${ogImage}`;

    // Title
    document.title = title;

    // Helper to set/create a meta tag
    const setMeta = (
      attr: "name" | "property",
      key: string,
      content: string
    ) => {
      let el = document.querySelector(
        `meta[${attr}="${key}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        el.dataset.seo = "dynamic";
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Core meta
    setMeta("name", "description", description);

    // Robots
    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      // Remove noindex if it was set by a previous route
      const robotsMeta = document.querySelector(
        'meta[name="robots"][data-seo="dynamic"]'
      );
      if (robotsMeta) robotsMeta.remove();
    }

    // Canonical link
    let canonicalEl = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      canonicalEl.dataset.seo = "dynamic";
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImageUrl);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:site_name", "DashCraft");
    setMeta("property", "og:locale", "en_US");

    // Twitter / X
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImageUrl);

    // JSON-LD structured data
    // Remove previous static or dynamic JSON-LD scripts to prevent duplication
    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((el) => el.remove());

    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": schemas,
      };
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seo = "jsonld";
      script.textContent = JSON.stringify(jsonLdData);
      document.head.appendChild(script);
    }

    // Cleanup on unmount: remove only the dynamic tags we created
    return () => {
      document
        .querySelectorAll('[data-seo="dynamic"]')
        .forEach((el) => el.remove());
      document
        .querySelectorAll('script[data-seo="jsonld"]')
        .forEach((el) => el.remove());
    };
  }, [title, description, canonicalPath, ogType, ogImage, noindex, schema]);

  return null;
};

export default SEO;
