export const prerender = false;

import { getPB } from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types.js";

export async function POST({ request, locals }) {
  try {
    const user = locals?.user;
    if (!user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json" }
      });
    }

    const raw = await request.text();
    if (!raw) {
      return new Response(JSON.stringify({ success: false, error: "Body JSON manquant" }), {
        status: 400, headers: { "Content-Type": "application/json" },
      });
    }
    const { id, ...rest } = JSON.parse(raw);
    if (!id) {
      return new Response(JSON.stringify({ success: false, error: "Paramètre 'id' manquant" }), {
        status: 400, headers: { "Content-Type": "application/json" },
      });
    }

    const pb = await getPB();

    const payload = {
      nom_lunette: rest.nom_lunette ?? "",
      code_svg: rest.code_svg ?? "",
      prompt_ia: rest.prompt_ia ?? "",
      prix: typeof rest.prix === "number" ? rest.prix : 149,
      couleur_monture: rest.couleur_monture ?? "",
      couleur_branches: rest.couleur_branches ?? "",
      teinte_verres: rest.teinte_verres ?? "",
      largeur_pont: Number.isFinite(rest.largeur_pont) ? rest.largeur_pont : 0,
      taille_verre: Number.isFinite(rest.taille_verre) ? rest.taille_verre : 100,
      material: rest.material ?? "acetate",
      genere_IA: !!rest.genere_IA,
    };

    const rec = await pb.collection(Collections.Lunettes).update(id, payload);
    return new Response(JSON.stringify({ success: true, id: rec.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[updateSVG] ERROR:", e);
    return new Response(JSON.stringify({ success: false, error: e?.message || String(e) }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
}
