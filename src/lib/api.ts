const DEFAULT_API_URL = "http://localhost:8000";

export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_URL
).replace(/\/+$/, "");

export function apiUrl(path: string) {
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function authHeader(token?: string | null): Record<string, string> {
  return token ? { authorization: `Bearer ${token}` } : {};
}
