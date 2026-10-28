import { headers } from "next/headers";

import { auth } from "./auth";

export async function getTokenFromServer() {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });
    return token;
  } catch {
    return null;
  }
}
