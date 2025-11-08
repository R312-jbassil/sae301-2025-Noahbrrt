export const prerender = false;

import { getPB } from "../../utils/pb.js";

export async function POST({ request }) {
  try {
    const { email, password, passwordConfirm, name } = await request.json();

    if (!email || !password || !passwordConfirm) {
      return new Response(JSON.stringify({ error: "Données manquantes" }), {
        status: 400, headers: { "Content-Type": "application/json" },
      });
    }
    if (password !== passwordConfirm) {
      return new Response(JSON.stringify({ error: "Les mots de passe ne correspondent pas" }), {
        status: 400, headers: { "Content-Type": "application/json" },
      });
    }

    const pb = await getPB();

    await pb.collection("users").create({
      email,
      password,
      passwordConfirm,
      name: name ?? "",
      emailVisibility: true,
    });

    const authData = await pb.collection("users").authWithPassword(email, password);

    const setCookie = pb.authStore.exportToCookie({
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: "Lax",
      path: "/",
    });

    return new Response(JSON.stringify({ ok: true, user: authData.record }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": setCookie,
      },
    });
  } catch (err) {
    console.error("[/api/signup] ERROR:", err);
    const message = err?.data?.message || err?.message || "Erreur serveur";
    return new Response(JSON.stringify({ error: message }), {
      status: 400, headers: { "Content-Type": "application/json" },
    });
  }
}
