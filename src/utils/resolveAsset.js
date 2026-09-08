import { SITE_URL } from "../services/api";
export function resolveAssetUrl(uri) {
  if (!uri) return null;
  if (uri.startsWith("http://") || uri.startsWith("https://")) {
    return uri;
  }
  const base = SITE_URL.replace(/\/+$/, "");
  const path = uri.replace(/^\/+/, "");
  return `${base}/${path}`;
}