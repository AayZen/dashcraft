# 📊 DashCraft

A modern, responsive **AI-powered dashboard builder** built using **React, TypeScript, Vite, Tailwind CSS, and OpenAI**. DashCraft lets users generate dashboard layouts from natural language prompts, customize widgets visually, preview dashboards, and save layouts locally.

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![OpenAI](https://img.shields.io/badge/OpenAI-API-black?style=for-the-badge&logo=openai)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success?style=for-the-badge)

---

## 🌐 Live Demo

> 🔗 Local App: https://dashcraft-five.vercel.app/

---

## 📸 Screenshots

### 🏠 Home Page

> <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1b856792-fc3c-41e8-83dc-ce01e6c66b82" />


### 🧩 Dashboard Builder

> <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/32b5b1ae-7a7c-4a4d-b202-0397e2d37647" />


### 🤖 AI Dashboard Generation

> <img width="432" height="930" alt="image" src="https://github.com/user-attachments/assets/0f165888-1901-47ef-b839-df9b9acb7426" />


### 👁️ Preview Modal

> <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/28165455-3bed-41ba-a2fe-40bf960ccaf3" />


---

# ✨ Features

### 🏠 Home Page

- Modern hero section
- Product-style landing page layout
- Feature highlights
- How-it-works section
- Dashboard preview section
- Responsive navigation

---

### 🧩 Dashboard Builder

- Interactive dashboard canvas
- Widget selection
- Widget ordering controls
- Dashboard title editing
- Widget title editing
- Metric and change editing
- Widget size controls
- Theme selection
- Compact and comfortable layout density

---

### 🤖 AI Dashboard Generation

- Prompt-based dashboard generation
- OpenAI-powered structured dashboard output
- Generates dashboard title
- Generates KPI widgets
- Generates chart widgets
- Generates table widgets
- Uses a local backend API to protect the OpenAI API key

---

### 📊 Dashboard Widgets

- KPI metric cards
- Sparkline previews
- Bar chart previews
- Line-style chart previews
- Donut chart previews
- Table-style account widgets
- Accent color system
- Responsive grid layout

---

### 👁️ Preview

- Full dashboard preview modal
- Clean presentation mode
- Close preview action
- Responsive preview layout

---

### 💾 Local Save

- Save current dashboard state
- Stores dashboard data using browser LocalStorage
- Shows saved and unsaved status

---

### 📱 Responsive Design

Fully responsive for:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

# 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React

### AI Backend

- Node.js
- OpenAI Node SDK
- Local API route
- Structured dashboard JSON generation

### Storage

- Browser LocalStorage

---

# 📂 Project Structure

```text
dashcraft/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── server/
│   ├── dev.mjs
│   └── index.mjs
│
├── src/
│   ├── components/
│   │   ├── home/
│   │   └── layout/
│   │
│   ├── layouts/
│   │   └── MainLayout.tsx
│   │
│   ├── pages/
│   │   ├── Builder/
│   │   ├── Dashboard/
│   │   └── Home/
│   │
│   ├── routes/
│   │   └── AppRouter.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# 🚀 Getting Started

## Install Dependencies

```bash
npm install
```

---

## Environment Setup

Create a `.env` file:

```bash
cp .env.example .env
```

For Windows PowerShell:

```powershell
copy .env.example .env
```

Then add your OpenAI API key:

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-5.6-luna
PORT=8787
```

> Do not commit `.env`. It is ignored by Git.

---

## Run Project

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

---

## Build Project

```bash
npm run build
```

---

## Run Lint

```bash
npm run lint
```

---

# 🔌 API Routes

### Health Check

```text
GET /api/health
```

### Generate Dashboard

```text
POST /api/generate-dashboard
```

Request body:

```json
{
  "prompt": "Create a SaaS revenue dashboard with MRR, churn, pipeline, and top accounts."
}
```

---

# 🔐 Security Notes

- Never place `OPENAI_API_KEY` inside React frontend code.
- Keep secrets inside `.env`.
- Do not upload `.env` to GitHub.
- If an API key is exposed publicly, rotate it from the OpenAI dashboard.
- The local Node server exists to keep AI calls private and secure.

---

# 💡 Future Improvements

- Drag-and-drop dashboard layout
- Resizable widgets
- Real chart library integration
- Export dashboard as image or PDF
- User authentication
- Cloud dashboard saving
- Dashboard templates
- Theme customization
- Team collaboration
- Shareable dashboard links
- AI prompt history
- Database integration
- Deployment to Vercel or Netlify

---

# 📊 Project Highlights

- ✅ AI-powered dashboard generation
- ✅ React and TypeScript frontend
- ✅ Vite development setup
- ✅ Tailwind CSS styling
- ✅ Responsive dashboard builder
- ✅ Local Node API server
- ✅ OpenAI integration
- ✅ Protected API key flow
- ✅ Editable widgets
- ✅ Preview modal
- ✅ LocalStorage save
- ✅ Mobile responsive layout
- ✅ Modern portfolio-ready UI

---

# 📈 Learning Outcomes

Through this project, I gained practical experience in:

- Building a React + TypeScript frontend
- Creating responsive layouts with Tailwind CSS
- Designing dashboard UI components
- Managing frontend state
- Building local API routes with Node.js
- Integrating OpenAI into a web app
- Protecting API keys using a backend layer
- Working with structured JSON responses
- Creating editable UI controls
- Building portfolio-ready project documentation

---

# 📄 License

This project is developed for educational and portfolio purposes.

---

# 👨‍💻 Author

## Aayan Kumar

**B.Tech Computer Science Engineering**

UI/UX Designer • Frontend Developer • AI & Web Enthusiast

### Connect with me

- GitHub: https://github.com/AayZen
- LinkedIn: https://linkedin.com/in/aayzen

---

⭐ If you like this project, don't forget to **Star** the repository!
