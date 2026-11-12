# Save Point

A library of famous indie games, built with React and React Router. This version adds Firebase Authentication, cached server data with TanStack Query and environment variables for the Server Data, Caching & Firebase Authentication homework.

Live: https://timafida999-star.github.io/ReactFirebaseHW/

## Pages

| Route         | Page                                           |
| ------------- | ---------------------------------------------- |
| `/`           | Home                                           |
| `/about`      | About the project                              |
| `/games`      | All games: search, filters, sorting, pages     |
| `/games/:id`  | Game page                                      |
| `/games/new`  | Add a game (logged in players only)            |
| `/wishlist`   | Wishlist                                       |
| `/dashboard`  | Statistics (logged in players only)            |
| `/login`      | Email/password and Google login                |
| `/signup`     | Registration with validation                   |
| `/profile`    | Email, UID, age group and logout (protected)   |
| `*`           | 404                                            |

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill `.env.local` with the config of your Firebase web app:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

`.env.local` is ignored by git. In Firebase Console enable Email/Password and Google in Authentication, and add the deployment domain to Authorized domains.

Open http://localhost:5173/ReactFirebaseHW/

## Authentication

- `src/firebase.js` initializes Firebase from the `VITE_` variables.
- `src/services/authService.js` wraps the Firebase calls and translates error codes.
- `AuthContext` exposes `user`, `loading`, `error`, `signup`, `login`, `loginWithGoogle` and `logout`, and follows the session with `onAuthStateChanged`.
- The session is stored with `browserLocalPersistence`, so it survives a refresh.
- `ProtectedRoute` waits for the loading state, then redirects guests to `/login`. Protected pages: `/games/new`, `/dashboard`, `/profile`.
- The NavBar shows Login and Signup for guests, Profile and Logout for logged in players.
- The age group that unlocks PEGI ratings is chosen on the profile page and stored per user id.

## Caching strategy

Server data is cached with TanStack Query. Components never call the API directly, they use the hooks from `src/hooks/useGames.js`, which call `src/services/service.js`.

| Query key                      | Data                                  |
| ------------------------------ | ------------------------------------- |
| `['games', 'list', params]`    | One page of the filtered games list   |
| `['games', 'detail', id]`      | One game and similar games            |
| `['games', 'everything']`      | All games for the dashboard           |
| `['games', 'by-ids', ids]`     | Wishlist games                        |

- Every filter, sort and page is part of the key, so each combination has its own cache entry and going back to a visited page is instant.
- Data is fresh for 1 minute (`staleTime`). After that it is shown from the cache and refetched in the background. Unused entries are removed after 5 minutes (`gcTime`). Stale data is also refetched when the window gets focus.
- Adding a game is a mutation. On success all queries under the `['games']` prefix are invalidated, so the list, the dashboard and the wishlist are loaded again with the new game.
- Outdated requests cannot overwrite newer results: every response is stored under its own key, and the request signal is aborted when the query is no longer used.
- Loading, error (with retry) and empty states are handled on every page.

## Extra features

- PEGI age ratings: guests see games up to 12, older ones are locked until login.
- Dashboard bars and the top 5 are links to filtered lists and game pages.
- Similar games of the same genre on the game page.
- Wishlist with total price.

## Images

Covers are loaded from the Steam store (`header.jpg` of each game). If an image does not load, the card shows a pixel icon of the genre instead.
