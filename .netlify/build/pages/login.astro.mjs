import { d as createComponent, e as createAstro, j as renderComponent, r as renderTemplate, g as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_CRDH0bDr.mjs';
import { $ as $$Layout } from '../chunks/Layout_D1VYXbu9.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  if (Astro2.locals.user) {
    return Astro2.redirect("/galerie");
  }
  const redirectTo = Astro2.url.searchParams.get("redirectTo") ?? "/galerie";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Connexion \u2014 TaVue" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<section class="min-h-[80vh] flex items-center px-4 py-10"> <div class="mx-auto w-full max-w-lg rounded-2xl border bg-white/95 p-6 sm:p-8 shadow-lg backdrop-blur"> <header class="mb-6 sm:mb-8 text-center"> <h1 class="text-2xl sm:text-3xl font-semibold">Connexion</h1> <p class="mt-2 text-sm text-gray-600">Ravi de vous revoir sur TaVue.</p> </header> <form id="login-form" class="space-y-4 sm:space-y-5" novalidate> <input type="hidden" name="redirectTo"', '> <div class="rounded-xl border bg-gray-50/70 p-3 sm:p-4 transition focus-within:border-black/70"> <label for="email" class="block text-sm font-medium text-gray-800 mb-1.5">Email</label> <input id="email" type="email" name="email" required autocomplete="email" class="w-full h-12 rounded-lg border border-gray-300 bg-white px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-black/60" placeholder="vous@exemple.fr"> </div> <div class="rounded-xl border bg-gray-50/70 p-3 sm:p-4 transition focus-within:border-black/70"> <label for="password" class="block text-sm font-medium text-gray-800 mb-1.5">Mot de passe</label> <input id="password" type="password" name="password" required autocomplete="current-password" class="w-full h-12 rounded-lg border border-gray-300 bg-white px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-black/60" placeholder="Votre mot de passe"> </div> <button type="submit" class="btn btn-primary w-full h-12 text-[15px] font-semibold">\nSe connecter\n</button> <p class="text-center text-sm text-gray-600">\nPas de compte ?\n<a class="link"', '>Cr\xE9er un compte</a> </p> <p id="status" class="text-center text-sm text-red-600 min-h-[1rem]"></p> </form> </div> </section> <script>\n    const form = document.getElementById("login-form");\n    const statusEl = document.getElementById("status");\n\n    form.addEventListener("submit", async (e) => {\n      e.preventDefault();\n      statusEl.textContent = "Connexion...";\n      const fd = new FormData(form);\n\n      try {\n        const res = await fetch("/api/login", {\n          method: "POST",\n          headers: { "Content-Type": "application/json" },\n          credentials: "include",\n          body: JSON.stringify({\n            email: fd.get("email"),\n            password: fd.get("password"),\n          }),\n        });\n\n        if (res.ok) {\n          const redirectTo =\n            new URLSearchParams(location.search).get("redirectTo") ||\n            "/galerie";\n          statusEl.textContent = "\u2705 Connect\xE9 !";\n          window.location.href = redirectTo;\n        } else {\n          const data = await res.json().catch(() => ({}));\n          statusEl.textContent =\n            "\u274C " + (data.error || "Email ou mot de passe invalide");\n        }\n      } catch (err) {\n        statusEl.textContent = "\u26A0\uFE0F Erreur de connexion au serveur";\n      }\n    });\n  <\/script> '])), maybeRenderHead(), addAttribute(redirectTo, "value"), addAttribute(`/signup?redirectTo=${encodeURIComponent(redirectTo)}`, "href")) })}`;
}, "C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/pages/login.astro", void 0);

const $$file = "C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
