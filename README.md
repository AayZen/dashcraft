# DashCraft

DashCraft is a frontend-first React dashboard builder. It lets users describe a dashboard, generate a layout with AI, customize widgets visually, preview the result, and save the current builder state locally.

The main application lives in the `dashcraft/` folder. The project also includes a small local Node API server used only to keep the OpenAI API key out of the browser.

## Is This A Frontend Project?

Yes. DashCraft is mainly a frontend project built with React, TypeScript, Vite, Tailwind CSS, and Lucide icons.

There is one lightweight backend file at `dashcraft/server/index.mjs` for AI generation. This is needed because OpenAI API keys should never be exposed in frontend code.

## Features

- Landing page for DashCraft
- Builder page with a dashboard canvas
- Prompt-based AI dashboard generation
- Widget library for metrics, charts, donut views, and tables
- Inspector panel for editing dashboard and widget details
- Preview modal
- Local save using `localStorage`
- OpenAI API integration through a local `/api/generate-dashboard` endpoint

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- OpenAI Node SDK
- Node.js local API server

## Project Structure

```text
DashCraft/
  package.json              # Root scripts that proxy into dashcraft/
  dashcraft/
    src/                    # React frontend
    src/pages/Builder/      # Dashboard builder page
    server/                 # Local AI API server
    public/                 # Static assets
    .env.example            # Environment variable template
    package.json            # App dependencies and scripts
```

## Getting Started

From the project root:

```powershell
cd C:\Users\aayan\OneDrive\Desktop\DashCraft
npm run dev
```

Then open:

```text
http://127.0.0.1:5173/
```

The Builder page is available at:

```text
http://127.0.0.1:5173/builder
```

## Environment Setup

Create a `.env` file inside `dashcraft/`:

```powershell
cd C:\Users\aayan\OneDrive\Desktop\DashCraft\dashcraft
copy .env.example .env
```

Then add your API key:

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-5.6-luna
PORT=8787
```

Do not commit `.env`. It is ignored by Git.

## Available Scripts

From the root folder:

```powershell
npm run dev       # Starts frontend and local AI API server
npm run build     # Builds the React app
npm run lint      # Runs ESLint
npm run preview   # Runs Vite preview
```

Inside `dashcraft/`:

```powershell
npm run dev       # Starts both web and API dev servers
npm run dev:web   # Starts only Vite frontend
npm run dev:api   # Starts only the local AI API server
npm run build     # Type-checks and builds the app
npm run lint      # Runs ESLint
```

## AI Generation Flow

1. The user writes a dashboard prompt in the Builder page.
2. The frontend sends the prompt to `/api/generate-dashboard`.
3. Vite proxies `/api` requests to the local Node server on port `8787`.
4. The server calls OpenAI using `OPENAI_API_KEY` from `.env`.
5. OpenAI returns structured dashboard JSON.
6. The Builder updates the canvas with generated widgets.

## Troubleshooting

If Generate shows a quota or billing message, the API key is working but the OpenAI project does not currently have available quota. Check billing or usage in the OpenAI dashboard, then try again.

If the page loads but AI generation fails, make sure both servers are running:

```text
Frontend: http://127.0.0.1:5173
API:      http://127.0.0.1:8787/api/health
```

If styles look broken, restart the dev server:

```powershell
npm run dev
```

## Security Notes

- Never put `OPENAI_API_KEY` in React frontend code.
- Keep secrets in `dashcraft/.env` only.
- Do not commit `.env` to GitHub.
- If an API key was shared publicly or pasted somewhere unsafe, rotate it in the OpenAI dashboard.
