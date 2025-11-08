export const prerender = false;

import { getPB } from "../../utils/pb.js";
import { Collections } from "../../utils/pocketbase-types.js";

export async function POST({ request, cookies }) {
  try {
    const { email, password } = await request.json();
    console.log("[/api/login] try:", email, "Collections.Users=", Collections?.Users);

    const pb = await getPB();
    const authData = await pb.collection(Collections.Users).authWithPassword(email, password);

    cookies.set("pb_auth", pb.authStore.exportToCookie(), {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false, 
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    console.log("[/api/login] success user:", authData.record?.id);
    return new Response(JSON.stringify({ user: authData.record }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("[/api/login] ERROR:", err?.status, err?.message, err?.data);
    return new Response(JSON.stringify({ error: "Identifiants invalides" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
