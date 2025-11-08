export const prerender = false;

import { getPB } from "../../utils/pb.js";
import { Collections } from "../../utils/pocketbase-types.js";

export async function POST({ request }) {
  try {
    const { email, password } = await request.json();

    const pb = await getPB();
    const authData = await pb
      .collection(Collections.Users)
      .authWithPassword(email, password);

    const setCookie = pb.authStore.exportToCookie({
      httpOnly: true,
      secure: import.meta.env.PROD, 
      sameSite: "Lax",
      path: "/",
    });

    return new Response(JSON.stringify({ user: authData.record }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": setCookie,
      },
    });
  } catch (err) {
    console.error("[/api/login] ERROR:", err?.status, err?.message, err?.data);
    return new Response(JSON.stringify({ error: "Identifiants invalides" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
