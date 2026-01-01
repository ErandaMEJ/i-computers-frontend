import { api } from "./api";

const KEY = "me";

export function getCachedMe() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function cacheMe(me) {
  try {
    localStorage.setItem(KEY, JSON.stringify(me));
  } catch {
    // ignore
  }
}

export async function fetchMe() {
  const res = await api.get("/users/");
  cacheMe(res.data);
  return res.data;
}