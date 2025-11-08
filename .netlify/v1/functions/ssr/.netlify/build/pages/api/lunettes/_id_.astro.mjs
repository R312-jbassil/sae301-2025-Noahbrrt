import { g as getPB } from '../../../chunks/pb_CchWKmvo.mjs';
import { C as Collections } from '../../../chunks/pocketbase-types_D6q2P-gX.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;

async function GET({ params, cookies }) {
  try {
    const pb = await getPB();

    const ck = cookies.get("pb_auth")?.value;
    if (ck) {
      pb.authStore.loadFromCookie(ck);
      try { await pb.collection("users").authRefresh(); } catch {}
    }

    if (!pb.authStore.isValid) {
      return new Response(JSON.stringify({ success: false, error: "not_authenticated" }), {
        status: 401, headers: { "Content-Type": "application/json" },
      });
    }

    const item = await pb.collection(Collections.Lunettes).getOne(params.id);

    return new Response(JSON.stringify({ success: true, item }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[api/lunettes/:id] error:", e?.status, e?.message, e?.data);
    const status = e?.status || 400;
    return new Response(JSON.stringify({
      success: false,
      error: e?.data || e?.message || "fetch_failed",
    }), { status, headers: { "Content-Type": "application/json" } });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
