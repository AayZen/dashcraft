/**
 * Centralized SEO metadata and JSON-LD structured data for each public route.
 *
 * All structured data matches visible, truthful page content.
 * No fake ratings, reviews, users, awards, pricing, companies, or professional claims.
 */

const CANONICAL_ORIGIN = "https://dashcraft-five.vercel.app";

/* ───── Home Page ───── */
export const homeSEO = {
  title: "DashCraft — Visual Dashboard Builder & Analytics Dashboard Studio",
  description:
    "Build polished analytics dashboards visually with DashCraft. Create, customize, save, and present responsive dashboards with editable widgets, templates, and AI-assisted generation.",
  canonicalPath: "/",
  ogType: "website",
  schema: [
    // WebSite
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "DashCraft",
      url: CANONICAL_ORIGIN,
      description:
        "DashCraft is a visual dashboard creation studio for building polished analytics dashboards without fighting with code or rigid templates.",
      creator: {
        "@type": "Person",
        name: "Aayan Kumar",
        url: "https://aayan-kumar-portfolio.vercel.app/",
        sameAs: [
          "https://www.linkedin.com/in/aayzen/",
          "https://github.com/AayZen",
        ],
      },
    },
    // SoftwareApplication
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "DashCraft",
      url: CANONICAL_ORIGIN,
      applicationCategory: "DesignApplication",
      operatingSystem: "Web",
      description:
        "Visual dashboard creation studio for building polished analytics dashboards with editable widgets, templates, and AI-assisted generation.",
      creator: {
        "@type": "Person",
        name: "Aayan Kumar",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    // BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: CANONICAL_ORIGIN + "/",
        },
      ],
    },
  ],
};

/* ───── Templates Page ───── */
export const templatesSEO = {
  title: "Dashboard Templates — DashCraft",
  description:
    "Explore customizable analytics dashboard templates for SaaS, e-commerce, DevOps, marketing, finance, product analytics, and customer support.",
  canonicalPath: "/templates",
  ogType: "website",
  schema: [
    // WebPage
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Dashboard Templates",
      url: CANONICAL_ORIGIN + "/templates",
      description:
        "Customizable analytics dashboard templates for SaaS, e-commerce, DevOps, marketing, finance, product analytics, and customer support.",
      isPartOf: {
        "@type": "WebSite",
        name: "DashCraft",
        url: CANONICAL_ORIGIN,
      },
    },
    // BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: CANONICAL_ORIGIN + "/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Templates",
          item: CANONICAL_ORIGIN + "/templates",
        },
      ],
    },
  ],
};

/* ───── About Page ───── */
export const aboutSEO = {
  title: "About DashCraft — Created by Aayan Kumar",
  description:
    "Learn about DashCraft, a visual dashboard creation studio built by Aayan Kumar using React, TypeScript, and modern web technologies.",
  canonicalPath: "/about",
  ogType: "website",
  schema: [
    // AboutPage
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About DashCraft",
      url: CANONICAL_ORIGIN + "/about",
      description:
        "Learn about DashCraft, a visual dashboard creation studio built by Aayan Kumar using React, TypeScript, and modern web technologies.",
      isPartOf: {
        "@type": "WebSite",
        name: "DashCraft",
        url: CANONICAL_ORIGIN,
      },
    },
    // Person (Creator)
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Aayan Kumar",
      jobTitle: "Cloud Computing / Web Development / UI/UX Design",
      url: "https://aayan-kumar-portfolio.vercel.app/",
      sameAs: [
        "https://www.linkedin.com/in/aayzen/",
        "https://github.com/AayZen",
      ],
    },
    // BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: CANONICAL_ORIGIN + "/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: CANONICAL_ORIGIN + "/about",
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
