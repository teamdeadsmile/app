# DEADSMILE Mobile

Expo application (Android + Web) based on the existing DEADSMILE project and consuming the Express backend without duplicating business rules.

## Stack
- Expo SDK 57 / React Native 0.86 / React 19.2
- Expo Router
- React Native Web
- React Native Reanimated + Worklets
- Material You Icons
- Space Grotesk + Manrope (same fonts as the website)

## Configuration
1. Copy `.env.example` to `.env`.
2. Set `EXPO_PUBLIC_API_URL` with the API URL ending in `/api`.
3. Set `EXPO_PUBLIC_SITE_URL` with the website URL.
4. `npm install`
5. `npx expo install --fix`
6. `npx expo install --check`
7. `npm run web` or `npm run android`

### Android local
On a physical device/emulator, `localhost` is not your computer. Use your machine's IP address, for example `http://192.168.0.10:5000/api`. On the standard Android emulator, you can also use `http://10.0.2.2:5000/api`.

## Backend / CORS
The original backend accepts a single `FRONTEND_URL`. To test the Web app at `http://localhost:8081`, include this origin in the backend CORS configuration. The `backend-cors.patch.md` file contains the suggested change without removing the current domain.

## Integrations Used
- `GET /api/games`, `GET /api/games/:slug`
- `GET /api/news`, `GET /api/news/:slug`
- `GET /api/videos`, `GET /api/videos/:id`
- `GET /api/search`
- `GET/POST/DELETE /api/wishlist`
- `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/account`
- `GET /api/csrf`

The app keeps the same session/cookie authentication model and CSRF protection already used by the website.
