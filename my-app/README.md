# Movie Watchlist — Frontend

A React single-page application for managing your personal movie watchlist. Search movies via TMDB, add them to your watchlist, mark as watched, and leave reviews with ratings.

## Tech Stack

- **Framework:** React 19
- **Routing:** React Router 7
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS 4
- **UI Components:** Headless UI, Heroicons
- **Build Tool:** Vite 8

## Prerequisites

- Node.js (v18+)
- Backend API running at `http://localhost:3000` (see [backend README](../../watchlist-backend/README.md))

## Getting Started

### 1. Clone the repository

```bash
git clone <your-frontend-repo-url>
cd movie-watchlist-client/my-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

### 4. Build for production

```bash
npm run build
npm run preview
```

## Features

### Authentication
- **Register** — create a new account (username, email, password)
- **Login** — sign in and receive a JWT stored in localStorage
- **Logout** — clear token and redirect to login
- **Persistent sessions** — token survives page refresh until expiry (2 days)

### Protected Routes
- Dashboard, Search, and Movie Detail pages are only accessible to logged-in users
- Unauthenticated users are redirected to `/login`
- Expired tokens are handled automatically (401 → redirect to login)

### Movie Search (TMDB)
- Search movies by title via the TMDB API (through the backend)
- View poster, title, release date, rating, and overview
- Add movies to your watchlist with one click

### Watchlist (CRUD)
- **Create** — add movies from search results
- **Read** — view all movies in your watchlist with posters, genres, and ratings
- **Update** — toggle watched/unwatched status
- **Delete** — remove movies from your watchlist

### Reviews & Comments
- Leave a written review on any movie in your watchlist
- Add an optional rating (1–10) with visual star display
- View all reviews from other users
- Delete your own comments

## Pages

| Route         | Component        | Auth Required | Description                      |
|---------------|------------------|---------------|----------------------------------|
| `/login`      | Login            | No            | Sign in form                     |
| `/register`   | Register         | No            | Create account form              |
| `/dashboard`  | Dashboard        | Yes           | View & manage your watchlist     |
| `/search`     | SearchMovies     | Yes           | Search TMDB & add movies         |
| `/movie/:id`  | MovieDetail      | Yes           | Movie details & reviews          |

## Project Structure

```
my-app/
├── public/
├── src/
│   ├── api/
│   │   └── api.js                # Axios instance with JWT interceptors
│   ├── components/
│   │   ├── Navbar.jsx            # Auth-aware navigation bar
│   │   └── ProtectedRoute.jsx    # Route guard for authenticated pages
│   ├── context/
│   │   └── AuthContext.jsx       # Global auth state (login, register, logout)
│   ├── pages/
│   │   ├── Login.jsx             # Login form
│   │   ├── Register.jsx          # Registration form
│   │   ├── Dashboard.jsx         # Watchlist with toggle & delete
│   │   ├── SearchMovies.jsx      # TMDB movie search + add to watchlist
│   │   └── MovieDetail.jsx       # Movie info + comments/ratings
│   ├── AppRouter.jsx             # Route definitions & AuthProvider wrapper
│   ├── main.jsx                  # App entry point
│   ├── App.css                   # Tailwind import
│   └── index.css                 # Tailwind import
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Environment

The API base URL is configured in `src/api/api.js`:

```js
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})
```

Update this if your backend runs on a different host/port.

## Scripts

| Command            | Description                  |
|--------------------|------------------------------|
| `npm run dev`      | Start dev server (port 5173) |
| `npm run build`    | Production build to `dist/`  |
| `npm run preview`  | Preview production build     |
| `npm run lint`     | Run ESLint                   |

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
