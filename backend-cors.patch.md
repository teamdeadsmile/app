# Recommended backend patch for website + Expo Web

The current backend only uses `origin: env.frontendUrl`. To keep the original website and allow local Expo Web, accept a list of origins.

In `src/config/env.js`, add:

```js
frontendUrls: (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean),
```

In `src/app.js`, replace the CORS `origin` with:

```js
origin(origin, callback) {
  if (!origin || env.frontendUrls.includes(origin)) return callback(null, true);
  return callback(new Error('Origin not allowed by CORS'));
},
```

And in the backend `.env`:

```env
FRONTEND_URLS=https://your-site.com,http://localhost:5173,http://localhost:8081
```

Do not remove `credentials: true` or `X-CSRF-Token` from `allowedHeaders`.
