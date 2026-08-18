# DashCraft — Visual Dashboard Creation Studio

DashCraft is a visual dashboard creation studio for building polished analytics dashboards without fighting with code or rigid templates. Create, customize, save, and present responsive dashboards with editable widgets, templates, and AI-assisted generation.

**Live:** [https://dashcraft-five.vercel.app/](https://dashcraft-five.vercel.app/)

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![OpenAI](https://img.shields.io/badge/OpenAI-API-black?style=for-the-badge&logo=openai)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success?style=for-the-badge)

---

## Screenshots

### Home Page

> <img width="1915" height="925" alt="image" src="https://github.com/user-attachments/assets/d544ca43-e61d-4842-b42d-6114472864bf" />


### Dashboard Builder

> <img width="1919" height="925" alt="image" src="https://github.com/user-attachments/assets/d9b29bb2-1cc8-4215-98e6-32a1601cb44e" />


### AI Dashboard Generation

> <img width="1917" height="925" alt="image" src="https://github.com/user-attachments/assets/1856a369-6440-4b87-8b5d-7695638ef73a" />


### Preview / Presentation Mode

> <img width="1918" height="925" alt="image" src="https://github.com/user-attachments/assets/66d2c561-2e8f-4a41-b330-0444920f6a22" />

---

## Core Capabilities

- **Visual dashboard builder** — 3-zone studio layout with widget library, interactive canvas, and property inspector
- **Editable dashboard widgets** — KPI metric cards, bar charts, line/spline charts, area charts, donut charts, data tables, progress bars, and gauge widgets
- **AI-assisted dashboard generation** — Describe your dashboard in natural language; DashCraft generates structured layouts using the OpenAI API through a secure backend proxy
- **Offline dashboard synthesis** — Built-in fallback synthesizer generates demo dashboards locally when the OpenAI API is unavailable, clearly labeled as "Synthesized Demo"
- **Dashboard templates** — Production-ready starter templates for SaaS, E-Commerce, DevOps, Marketing, Product Analytics, Finance, and Customer Support
- **LocalStorage persistence** — All dashboards save directly in the browser with versioned autosave
- **Undo/redo history** — Full history stack with keyboard shortcuts (⌘Z, ⌘⇧Z)
- **Responsive layouts** — 12-column responsive grid with desktop, tablet, and mobile viewport support
- **Presentation/preview mode** — Full-screen dashboard presentation with viewport simulation and theme switching
- **Keyboard-first workflow** — Global command palette (⌘K) for adding widgets, switching themes, and exporting
- **Light/dark/system themes** — Zero-flash theme initialization with system preference detection

---

## AI Generation

DashCraft includes two distinct generation modes:

1. **AI Generated** — Uses the OpenAI API (via a secure Node.js backend proxy) to generate dashboard layouts from natural language prompts. The API key is never exposed to the frontend.
2. **Synthesized Demo** — An offline fallback that generates demo dashboard data locally without calling any external API. This is clearly labeled as "Synthesized Demo" in the UI to distinguish it from actual AI generation.

---

## Technology Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Lucide React (icons)
- SVG-based visualization rendering

### Backend (AI Proxy)
- Node.js
- OpenAI Node SDK
- Local API route (`/api/generate-dashboard`)
- Structured JSON dashboard generation

### Storage
- Browser LocalStorage (versioned autosave)

---

## Project Structure

```text
dashcraft/
├── public/
│   ├── brand/           # Logo SVGs, creator images, OG image
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── llms.txt
│   └── site.webmanifest
│
├── server/
│   ├── dev.mjs          # Combined dev server (Vite + API)
│   └── index.mjs        # API server (OpenAI proxy)
│
├── src/
│   ├── components/
│   │   ├── about/       # Creator card
│   │   ├── brand/       # Logo components
│   │   ├── builder/     # Dashboard editor components
│   │   ├── common/      # Modal, SEO, social icons
│   │   ├── creator/     # Creator profile
│   │   ├── home/        # Hero, Features, HowItWorks
│   │   ├── layout/      # AppNavbar, Footer
│   │   └── preview/     # PreviewMode
│   │
│   ├── constants/       # Creator info
│   ├── data/            # SEO metadata, structured data
│   ├── layouts/         # MainLayout, AppShell
│   │
│   ├── pages/
│   │   ├── About/
│   │   ├── Builder/
│   │   ├── Dashboards/
│   │   ├── Home/
│   │   ├── NotFound/
│   │   └── Templates/
│   │
│   ├── routes/          # AppRouter
│   ├── services/        # Storage, templates, AI generation
│   ├── store/           # State management
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
│
├── vercel.json          # Vercel SPA config + headers
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Install Dependencies

```bash
npm install
```

### Environment Setup

Create a `.env` file:

```bash
cp .env.example .env
```

Then add your OpenAI API key:

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o
PORT=8787
```

> The `.env` file is gitignored. Never commit API keys to the repository.

### Run Locally

```bash
npm run dev
```

Opens at: `http://127.0.0.1:5173`

### Build for Production

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## API Routes

### Health Check

```
GET /api/health
```

### Generate Dashboard

```
POST /api/generate-dashboard
```

Request body:

```json
{
  "prompt": "Create a SaaS revenue dashboard with MRR, churn, pipeline, and top accounts."
}
```

---

## Security

- The OpenAI API key is stored in `.env` and accessed only by the Node.js backend proxy.
- The frontend never has access to the API key.
- If a key is accidentally exposed, rotate it immediately from the OpenAI dashboard.
- All dashboard data is stored locally in the browser — nothing is uploaded to external servers.

---

## Deployment

DashCraft is deployed on [Vercel](https://vercel.com). The `vercel.json` configuration handles SPA client-side routing and static asset caching.

---

## Author

### Aayan Kumar

Cloud Computing / Web Development / UI/UX Design
B.Tech Computer Science & Engineering candidate at Lovely Professional University

- GitHub: [https://github.com/AayZen](https://github.com/AayZen)
- LinkedIn: [https://linkedin.com/in/aayzen](https://linkedin.com/in/aayzen)
- Portfolio: [https://aayan-kumar-portfolio.vercel.app/](https://aayan-kumar-portfolio.vercel.app/)

---

## License

This project is developed for educational and portfolio purposes.

---

⭐ If you like this project, don't forget to **Star** the repository!
