import { g as getPB } from '../../chunks/pb_CchWKmvo.mjs';
import { C as Collections } from '../../chunks/pocketbase-types_D6q2P-gX.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;

async function POST({ request, cookies }) {
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
