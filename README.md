# JOJ 2026 Quiz Platform — Frontend

React frontend for the JOJ 2026 Quiz Platform, a live multiplayer quiz game themed around the Youth Olympic Games Dakar 2026.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (Radix UI) |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Real-time | Socket.io-client |
| i18n | Custom context (FR/EN) |

## Pages & Routes

| Route | Page | Auth |
|---|---|---|
| `/` | Landing page | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/lobby` | Game hub | Protected |
| `/room/:code` | Live game room | Protected |
| `/solo/:quizId` | Solo quiz mode | Protected |
| `/builder` | Custom quiz builder | Protected |
| `/leaderboard` | Global rankings | Protected |
| `/profile` | User profile & stats | Protected |
| `/admin` | Admin panel | Admin only |
| `/results/:id` | Post-game results | Protected |

## Project Structure

```
joj-quiz-front/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx  # Global auth state + JWT
│   │   └── LanguageContext.jsx  # FR/EN translations
│   ├── hooks/
│   │   └── useSocket.js     # Singleton Socket.io connection
│   ├── lib/
│   │   ├── api.js           # Axios instance with JWT interceptor
│   │   └── utils.js         # Tailwind class merger
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── LobbyPage.jsx
│   │   ├── GameRoomPage.jsx
│   │   ├── SoloPage.jsx
│   │   ├── BuilderPage.jsx
│   │   ├── LeaderboardPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── AdminPage.jsx
│   │   └── ResultsPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── vercel.json
└── package.json
```

## Installation

```bash
git clone <https://github.com/Ousmane218/joj-quiz-backend>
cd joj-quiz-front
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL (e.g. `http://localhost:5000/api`) |
| `VITE_SOCKET_URL` | Backend Socket.io URL (e.g. `http://localhost:5000`) |

## Running the App

```bash
npm run dev
```

App runs on `http://localhost:5173`

## Key Features

- **Live multiplayer** — real-time quiz rooms via Socket.io, host controls the game
- **1v1 or group** — rooms support 2 to 10+ players
- **Best of N matches** — a game can contain 1 to 5 matches
- **Solo practice** — play any quiz alone at your own pace
- **Custom quiz builder** — pick questions from the bank, save your own quiz
- **Bilingual** — full French / English support, toggle in navbar
- **JOJ content** — 30+ questions on JOJ history, athletics, nations, champions
- **Admin panel** — add new questions to the bank (admin role required)

## Live URL

Frontend deployed at: https://joj-quiz-frontend.vercel.app/
