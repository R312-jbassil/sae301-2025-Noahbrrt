export { renderers } from '../../renderers.mjs';

const prerender = false;

async function POST({ request, cookies }) {
  cookies.delete("pb_auth", { path: "/" });

  const url = new URL(request.url);
  const next = url.searchParams.get("redirectTo") || "/";

  return new Response(null, {
    status: 303,
    headers: { Location: next },
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
