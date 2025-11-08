import { g as getPB } from '../../chunks/pb_CchWKmvo.mjs';
import { C as Collections } from '../../chunks/pocketbase-types_D6q2P-gX.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;

async function POST({ request, cookies, locals }) {
  try {
    const data = await request.json();
    console.log("[saveSVG] body:", data);

    const pb = await getPB();

    const cookie = cookies.get("pb_auth")?.value;
    if (cookie) {
      pb.authStore.loadFromCookie(cookie);
      try {
        await pb.collection("users").authRefresh();
      } catch (e) {
        console.error("[saveSVG] authRefresh fail:", e?.status, e?.message);
      }
    }
    if (!pb.authStore.isValid && !locals?.user) {
      return new Response(JSON.stringify({ success: false, error: "not_authenticated" }), {
        status: 401, headers: { "Content-Type": "application/json" },
      });
    }

    const userId = locals?.user?.id || pb.authStore?.record?.id;
    if (!userId) {
      return new Response(JSON.stringify({ success: false, error: "missing_user" }), {
        status: 400, headers: { "Content-Type": "application/json" },
      });
    }

    const payload = {
      nom_lunette: data.nom_lunette ?? data.name ?? "",
      code_svg: data.code_svg ?? "",
      prompt_ia: data.prompt_ia ?? "",
      chat_history: data.chat_history ?? "",   // uniquement si tu as ce champ
      prix: typeof data.prix === "number" ? data.prix : 149,

      couleur_monture: data.couleur_monture ?? null,
      couleur_branches: data.couleur_branches ?? null,
      teinte_verres: data.teinte_verres ?? null,

      largeur_pont: typeof data.largeur_pont === "number" ? data.largeur_pont : 0,
      taille_verre: typeof data.taille_verre === "number" ? data.taille_verre : 100,

      genere_IA: !!data.genere_IA,

      user: userId, 
    };

    const rec = await pb.collection(Collections.Lunettes).create(payload);
    console.log("[saveSVG] created id:", rec.id);

    return new Response(JSON.stringify({ success: true, id: rec.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[saveSVG] ERROR:", err?.status, err?.message, err?.data || err);
    return new Response(
      JSON.stringify({ success: false, error: err?.data || err?.message || "create_failed" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
