export const prerender = false;

import { getPB } from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export async function POST({ request }) {
  try {
    const raw = await request.text();
    if (!raw) {
      return new Response(JSON.stringify({ success: false, error: "Body JSON manquant" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const data = JSON.parse(raw);

    const pb = await getPB();

    const payload = {
      nom_lunette: data.nom_lunette ?? "",
      code_svg: data.code_svg ?? "",
      prompt_ia: data.prompt_ia ?? "",         // côté configurateur on laisse vide
      prix: typeof data.prix === "number" ? data.prix : 149,

      couleur_monture: data.couleur_monture ?? "",
      couleur_branches: data.couleur_branches ?? "",
      teinte_verres: data.teinte_verres ?? "",

      largeur_pont: data.largeur_pont ?? "",   // % (ex: -5..+10)
      taille_verre: data.taille_verre ?? "",   // % (ex: 100)

      genere_IA: typeof data.genere_IA === "boolean" ? data.genere_IA : false,
      material: data.material ?? "",           // si tu as ajouté ce champ côté PB
    };

    const rec = await pb.collection(Collections.Lunettes).create(payload);
    return new Response(JSON.stringify({ success: true, id: rec.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[saveSVG] ERROR:", e);
    return new Response(JSON.stringify({ success: false, error: e?.message || String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}