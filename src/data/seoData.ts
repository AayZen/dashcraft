/**
 * Centralized SEO metadata and JSON-LD structured data for each public route.
 *
 * Designed for Entity SEO & LLM Search Disambiguation:
 * - Establishes DashCraft as a distinct software entity (Visual Dashboard Creation Studio)
 * - Links creator Aayan Kumar with authoritative sameAs profiles (LinkedIn, GitHub, Portfolio)
 * - Links DashCraft with the official GitHub repository
 * - Uses stable @id references across WebSite, SoftwareApplication, Person, and WebPage nodes
 * - Strictly matches visible, truthful page content (no fake ratings, awards, or pricing claims)
 */

const CANONICAL_ORIGIN = "https://dashcraft-five.vercel.app";
const GITHUB_REPO = "https://github.com/AayZen/dashcraft";
const CREATOR_PORTFOLIO = "https://aayan-kumar-portfolio.vercel.app/";
const CREATOR_LINKEDIN = "https://www.linkedin.com/in/aayzen/";
const CREATOR_GITHUB = "https://github.com/AayZen";

/* ───── Authoritative Entity Definitions ───── */

export const CREATOR_ENTITY = {
  "@type": "Person",
  "@id": `${CANONICAL_ORIGIN}/#creator`,
  name: "Aayan Kumar",
  jobTitle: "Cloud Computing / Web Development / UI/UX Design",
  url: CREATOR_PORTFOLIO,
  sameAs: [
    CREATOR_LINKEDIN,
    CREATOR_GITHUB,
    CREATOR_PORTFOLIO,
  ],
};

export const WEBSITE_ENTITY = {
  "@type": "WebSite",
  "@id": `${CANONICAL_ORIGIN}/#website`,
  name: "DashCraft",
  alternateName: "DashCraft — Visual Dashboard Creation Studio",
  url: CANONICAL_ORIGIN,
  description:
    "DashCraft is a visual dashboard creation studio and visual dashboard builder by Aayan Kumar for creating, customizing, and presenting analytics dashboards in the browser.",
  creator: { "@id": `${CANONICAL_ORIGIN}/#creator` },
  publisher: { "@id": `${CANONICAL_ORIGIN}/#creator` },
  sameAs: [GITHUB_REPO],
  inLanguage: "en-US",
};

export const SOFTWARE_APPLICATION_ENTITY = {
  "@type": "SoftwareApplication",
  "@id": `${CANONICAL_ORIGIN}/#softwareapplication`,
  name: "DashCraft",
  alternateName: "DashCraft — Visual Dashboard Creation Studio",
  applicationCategory: "DesignApplication",
  applicationSubCategory: "Analytics Dashboard Builder",
  operatingSystem: "Web Browser",
  url: CANONICAL_ORIGIN,
  description:
    "DashCraft is a visual dashboard creation studio and visual dashboard builder by Aayan Kumar for creating, customizing, and presenting analytics dashboards in the browser.",
  creator: { "@id": `${CANONICAL_ORIGIN}/#creator` },
  author: { "@id": `${CANONICAL_ORIGIN}/#creator` },
  isPartOf: { "@id": `${CANONICAL_ORIGIN}/#website` },
  sameAs: [GITHUB_REPO],
};

/* ───── Home Page ───── */
export const homeSEO = {
  title: "DashCraft — Visual Dashboard Creation Studio",
  description:
    "DashCraft is a visual dashboard creation studio and visual dashboard builder by Aayan Kumar for creating, customizing, and presenting analytics dashboards in the browser.",
  canonicalPath: "/",
  ogType: "website",
  schema: [
    CREATOR_ENTITY,
    WEBSITE_ENTITY,
    SOFTWARE_APPLICATION_ENTITY,
    // BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL_ORIGIN}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${CANONICAL_ORIGIN}/`,
        },
      ],
    },
  ],
};

/* ───── Templates Page ───── */
export const templatesSEO = {
  title: "Dashboard Templates — DashCraft",
  description:
    "Explore customizable analytics dashboard templates for SaaS, e-commerce, DevOps, marketing, finance, product analytics, and customer support in DashCraft.",
  canonicalPath: "/templates",
  ogType: "website",
  schema: [
    CREATOR_ENTITY,
    {
      "@type": "CollectionPage",
      "@id": `${CANONICAL_ORIGIN}/templates#collectionpage`,
      name: "Dashboard Templates — DashCraft",
      url: `${CANONICAL_ORIGIN}/templates`,
      description:
        "Customizable analytics dashboard templates for SaaS, e-commerce, DevOps, marketing, finance, product analytics, and customer support.",
      isPartOf: { "@id": `${CANONICAL_ORIGIN}/#website` },
      about: { "@id": `${CANONICAL_ORIGIN}/#softwareapplication` },
      creator: { "@id": `${CANONICAL_ORIGIN}/#creator` },
      inLanguage: "en-US",
    },
    // BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL_ORIGIN}/templates#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${CANONICAL_ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Templates",
          item: `${CANONICAL_ORIGIN}/templates`,
        },
      ],
    },
  ],
};

/* ───── About Page ───── */
export const aboutSEO = {
  title: "About DashCraft — Visual Dashboard Creation Studio by Aayan Kumar",
  description:
    "Learn about DashCraft, a visual dashboard creation studio built by Aayan Kumar using React, TypeScript, and modern web technologies.",
  canonicalPath: "/about",
  ogType: "website",
  schema: [
    CREATOR_ENTITY,
    {
      "@type": "AboutPage",
      "@id": `${CANONICAL_ORIGIN}/about#aboutpage`,
      name: "About DashCraft — Visual Dashboard Creation Studio",
      url: `${CANONICAL_ORIGIN}/about`,
      description:
        "Learn about DashCraft, a visual dashboard creation studio built by Aayan Kumar using React, TypeScript, and modern web technologies.",
      isPartOf: { "@id": `${CANONICAL_ORIGIN}/#website` },
      about: { "@id": `${CANONICAL_ORIGIN}/#softwareapplication` },
      mainEntity: { "@id": `${CANONICAL_ORIGIN}/#softwareapplication` },
      creator: { "@id": `${CANONICAL_ORIGIN}/#creator` },
      inLanguage: "en-US",
    },
    // BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL_ORIGIN}/about#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${CANONICAL_ORIGIN}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${CANONICAL_ORIGIN}/about`,
        },
      ],
    },
  ],
};

/* ───── Dashboards Page (noindex — local storage content) ───── */
export const dashboardsSEO = {
  title: "My Dashboards — DashCraft",
  description:
    "Manage and edit your saved DashCraft visual analytics dashboards.",
  canonicalPath: "/dashboards",
  noindex: true,
};

/* ───── Builder Page (noindex — editor state) ───── */
export const builderSEO = {
  title: "Dashboard Studio — DashCraft",
  description:
    "Build and edit visual analytics dashboards in the DashCraft Studio.",
  canonicalPath: "/builder",
  noindex: true,
};

/* ───── Preview Page (noindex — presentation state) ───── */
export const previewSEO = {
  title: "Dashboard Preview — DashCraft",
  description:
    "Preview your DashCraft dashboard in presentation mode.",
  canonicalPath: "/preview",
  noindex: true,
};

/* ───── 404 Not Found ───── */
export const notFoundSEO = {
  title: "Page Not Found — DashCraft",
  description: "The page you are looking for does not exist.",
  canonicalPath: "/",
  noindex: true,
};
