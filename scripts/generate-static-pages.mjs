import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

const CANONICAL_ORIGIN = "https://dashcraft-five.vercel.app";
const GITHUB_REPO = "https://github.com/AayZen/dashcraft";
const CREATOR_PORTFOLIO = "https://aayan-kumar-portfolio.vercel.app/";
const CREATOR_LINKEDIN = "https://www.linkedin.com/in/aayzen/";
const CREATOR_GITHUB = "https://github.com/AayZen";

const CREATOR_ENTITY = {
  "@type": "Person",
  "@id": `${CANONICAL_ORIGIN}/#creator`,
  name: "Aayan Kumar",
  jobTitle: "Cloud Computing / Web Development / UI/UX Design",
  url: CREATOR_PORTFOLIO,
  sameAs: [CREATOR_LINKEDIN, CREATOR_GITHUB, CREATOR_PORTFOLIO],
};

const pages = [
  {
    path: "templates",
    title: "Dashboard Templates — DashCraft",
    description:
      "Explore customizable analytics dashboard templates for SaaS, e-commerce, DevOps, marketing, finance, product analytics, and customer support in DashCraft.",
    canonical: `${CANONICAL_ORIGIN}/templates`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
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
    },
  },
  {
    path: "about",
    title: "About DashCraft — Visual Dashboard Creation Studio by Aayan Kumar",
    description:
      "Learn about DashCraft, a visual dashboard creation studio built by Aayan Kumar using React, TypeScript, and modern web technologies.",
    canonical: `${CANONICAL_ORIGIN}/about`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
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
    },
  },
];

function generateStaticPages() {
  const indexPath = path.join(distDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("dist/index.html not found. Run vite build first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, "utf-8");

  for (const page of pages) {
    const pageDir = path.join(distDir, page.path);
    fs.mkdirSync(pageDir, { recursive: true });

    let pageHtml = baseHtml;

    // Replace Title
    pageHtml = pageHtml.replace(
      /<title>.*?<\/title>/s,
      `<title>${page.title}</title>`
    );

    // Replace Description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
      `<meta name="description" content="${page.description}" />`
    );

    // Replace Canonical Link
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/s,
      `<link rel="canonical" href="${page.canonical}" />`
    );

    // Replace Open Graph Title & Description & URL
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:title" content="${page.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:description" content="${page.description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:url" content="${page.canonical}" />`
    );

    // Replace Twitter Card Title & Description
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/s,
      `<meta name="twitter:title" content="${page.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/s,
      `<meta name="twitter:description" content="${page.description}" />`
    );

    // Replace JSON-LD schema
    const jsonLdString = JSON.stringify(page.schema, null, 2);
    pageHtml = pageHtml.replace(
      /<script\s+type="application\/ld\+json"[^>]*>.*?<\/script>/s,
      `<script type="application/ld+json" data-seo="jsonld">\n${jsonLdString}\n    </script>`
    );

    const outPath = path.join(pageDir, "index.html");
    fs.writeFileSync(outPath, pageHtml, "utf-8");
    console.log(`Generated static entry for /${page.path} at ${outPath}`);
  }
}

generateStaticPages();
