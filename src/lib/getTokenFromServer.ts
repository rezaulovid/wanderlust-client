import { headers } from "next/headers";

export async function getTokenFromServer() {
  const headerList = await headers();
  const cookie = headerList.get("cookie") ?? "";
  const match = cookie.match(/(?:^|; )\s*better-auth\.session=([^;]*)/);
  return match ? match[1] : null;
}
