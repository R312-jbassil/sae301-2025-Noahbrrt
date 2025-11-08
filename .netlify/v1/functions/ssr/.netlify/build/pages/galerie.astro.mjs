import { d as createComponent, e as createAstro, j as renderComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, g as addAttribute } from '../chunks/astro/server_CRDH0bDr.mjs';
import { $ as $$Layout } from '../chunks/Layout_D1VYXbu9.mjs';
import { g as getPB } from '../chunks/pb_CchWKmvo.mjs';
import { C as Collections } from '../chunks/pocketbase-types_D6q2P-gX.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Galerie = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Galerie;
  const pb = await getPB();
  const cookie = Astro2.cookies.get("pb_auth")?.value;
  if (cookie) {
    pb.authStore.loadFromCookie(cookie);
    try {
      await pb.collection("users").authRefresh();
    } catch {
      pb.authStore.clear();
    }
  }
  const user = Astro2.locals.user;
  let items = [];
  try {
    items = await pb.collection(Collections.Lunettes).getFullList({
      sort: "-created",
      filter: `user = "${user.id}"`
    });
  } catch (e) {
    console.error("[galerie] PB error:", e?.status, e?.message, e?.data);
    items = [];
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mes lunettes \u2014 Galerie" }, { "default": async ($$result2) => renderTemplate`${items.length === 0 ? renderTemplate`${maybeRenderHead()}<p class="text-sm text-gray-600">Aucune création pour l’instant. Lance le configurateur !</p>` : renderTemplate`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> ${items.map((it) => renderTemplate`<article class="rounded-2xl border bg-white shadow-sm overflow-hidden"> <div class="aspect-[4/3] grid place-items-center bg-gray-50 p-4"> <div class="w-full max-w-[420px]">${unescapeHTML(it.code_svg)}</div> </div> <div class="p-4 space-y-2 text-sm"> <div class="flex items-center justify-between"> <h3 class="font-semibold truncate"${addAttribute(it.nom_lunette, "title")}>${it.nom_lunette || "Sans nom"}</h3> <span class="text-xs text-gray-500">${new Date(it.created).toLocaleDateString()}</span> </div> <div class="flex flex-wrap items-center gap-2"> ${it.couleur_monture && renderTemplate`<span class="text-[11px] border rounded px-2 py-0.5">Monture</span>`} ${typeof it.taille_verre !== "undefined" && renderTemplate`<span class="text-[11px] border rounded px-2 py-0.5">Verres ${it.taille_verre}%</span>`} ${typeof it.largeur_pont !== "undefined" && renderTemplate`<span class="text-[11px] border rounded px-2 py-0.5">Pont ${it.largeur_pont >= 0 ? "+" : ""}${it.largeur_pont}%</span>`} ${it.genere_IA ? renderTemplate`<span class="text-[11px] rounded px-2 py-0.5 bg-purple-50 border border-purple-200">IA</span>` : renderTemplate`<span class="text-[11px] rounded px-2 py-0.5 bg-emerald-50 border-emerald-200 border">Config</span>`} </div> <div class="pt-2"> <a${addAttribute(`${it.genere_IA ? "/ia-generator" : "/configurateur"}?id=${it.id}`, "href")} class="text-xs underline hover:no-underline"> ${it.genere_IA ? "Continuer la g\xE9n\xE9ration IA" : "Continuer la configuration"} </a> </div> </div> </article>`)} </div>`}` })}`;
}, "C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/pages/galerie.astro", void 0);

const $$file = "C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/pages/galerie.astro";
const $$url = "/galerie";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Galerie,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
