# creAnva - AI-Powered Video & Guide Creator

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite" alt="Vite">
</p>

**creAnva** is an AI-powered platform that automatically converts screen recordings into professional product videos and step-by-step guides. Built for product teams, customer education specialists, and marketing professionals.

## 🚀 Features

- **🎬 Screen Recording** - Capture full screen, window, or browser tab with webcam overlay
- **🤖 AI Enhancement** - Automatic filler word removal, script cleanup, and professional voiceovers
- **📖 Auto-Generated Guides** - Transform recordings into step-by-step documentation
- **✂️ Dual-Panel Editor** - Video timeline and guide editor in sync
- **📤 Multi-Format Export** - MP4, PDF, Markdown, and interactive HTML
- **💬 AI Chatbot** - Built-in assistant for user support

## 📋 Table of Contents

- [Setup & Installation](#setup--installation)
- [Running Locally](#running-locally)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Design Decisions](#design-decisions)
- [Technology Stack](#technology-stack)
- [Contributing](#contributing)

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or bun

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/creanva.git

# 2. Navigate to project directory
cd creanva

# 3. Install dependencies
npm install
# or
bun install

# 4. Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173`

## 🏃 Running Locally

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │ Landing  │  │Dashboard │  │Recording │  │  Editor (Dual)   │ │
│  │  Page    │  │  Page    │  │  Page    │  │  Video + Guide   │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                    Shared Components                            │
│  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌───────────┐            │
│  │ Button  │ │  Card   │ │ Chatbot  │ │  NavLink  │  ...       │
│  └─────────┘ └─────────┘ └──────────┘ └───────────┘            │
├─────────────────────────────────────────────────────────────────┤
│                      State Management                           │
│              React Query + Local State (useState)               │
├─────────────────────────────────────────────────────────────────┤
│                      Styling Layer                              │
│           Tailwind CSS + Custom Design System Tokens            │
└─────────────────────────────────────────────────────────────────┘

                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (Planned)                            │
├─────────────────────────────────────────────────────────────────┤
│  Django REST API  │  Celery Tasks  │  WebSocket (Channels)     │
├─────────────────────────────────────────────────────────────────┤
│            AI Services (OpenAI, Whisper, ElevenLabs)            │
├─────────────────────────────────────────────────────────────────┤
│              PostgreSQL + S3/Cloudinary Storage                 │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Records Screen
        │
        ▼
┌───────────────┐
│  Upload to    │
│   Storage     │
└───────┬───────┘
        │
        ▼
┌───────────────┐     ┌───────────────┐
│ Video Analysis│────▶│ Transcription │
│   (OpenCV)    │     │   (Whisper)   │
└───────────────┘     └───────┬───────┘
                              │
                              ▼
                    ┌───────────────┐
                    │ AI Enhancement│
                    │    (GPT-4)    │
                    └───────┬───────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   Voiceover   │  │    Guide      │  │   Chapters    │
│ (ElevenLabs)  │  │  Generation   │  │  Generation   │
└───────────────┘  └───────────────┘  └───────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
                  ┌───────────────┐
                  │  Dual Editor  │
                  │ Video + Guide │
                  └───────────────┘
```

## 📁 Project Structure

```
creanva/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/              # Static assets (images)
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── AIChatbot.tsx    # AI assistant component
│   │   └── NavLink.tsx      # Navigation component
│   ├── hooks/               # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   ├── LandingPage.tsx  # Marketing homepage
│   │   ├── Dashboard.tsx    # Project management
│   │   ├── RecordingPage.tsx# Screen recording UI
│   │   ├── EditorPage.tsx   # Dual-panel editor
│   │   ├── ProcessingPage.tsx# AI processing status
│   │   └── NotFound.tsx     # 404 page
│   ├── App.tsx              # Root component & routes
│   ├── App.css              # Global app styles
│   ├── index.css            # Design system tokens
│   └── main.tsx             # Entry point
├── index.html               # HTML template
├── tailwind.config.ts       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies
```

## 🎨 Design Decisions

### 1. Dark Mode First Approach
The design system prioritizes dark mode as the primary theme, with full light mode support. This aligns with modern creative tool aesthetics.

### 2. Design System Tokens
All colors, shadows, and gradients are defined as CSS custom properties in `index.css`, ensuring consistency and easy theming:

```css
--primary: 239 84% 67%;        /* Indigo */
--secondary: 160 84% 39%;      /* Emerald */
--gradient-primary: linear-gradient(135deg, ...);
```

### 3. Glass Morphism UI
Components use backdrop blur and transparency for a modern, layered appearance:

```css
.glass {
  background: hsl(var(--card) / 0.8);
  backdrop-filter: blur(24px);
}
```

### 4. Component Architecture
- **Atomic Design**: UI components are small and composable
- **Shadcn/ui**: Pre-built accessible components as foundation
- **Custom Variants**: Extended button and card variants for unique branding

### 5. AI Chatbot Integration
Built-in AI assistant provides contextual help without leaving the app, improving user experience and reducing support load.

## 🔧 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | React 18 | UI library |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Components** | shadcn/ui | Accessible UI primitives |
| **Routing** | React Router 6 | Client-side routing |
| **State** | React Query | Server state management |
| **Build** | Vite | Fast bundling |
| **Icons** | Lucide React | Icon library |

### Planned Backend Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Django 4.2+ | REST API |
| **Task Queue** | Celery + Redis | Async processing |
| **Real-time** | Django Channels | WebSocket |
| **AI APIs** | OpenAI, Whisper, ElevenLabs | AI features |
| **Database** | PostgreSQL + pgvector | Data storage |
| **Storage** | AWS S3 / Cloudinary | File storage |

## 📝 Assumptions & Limitations

### Current State (Frontend Only)
- All AI processing is simulated in the UI
- No persistent data storage
- Authentication is UI-only (no real auth)
- Recording uses mock interface

### Future Implementation
- Backend API integration required for full functionality
- Real screen recording via MediaRecorder API
- AI processing via external APIs
- User authentication with JWT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ by the creAnva Team</p>
