export const prerender = false;

export async function POST({ request, cookies }) {
  cookies.delete("pb_auth", { path: "/" });

  const url = new URL(request.url);
  const next = url.searchParams.get("redirectTo") || "/";

  return new Response(null, {
    status: 303,
    headers: { Location: next },
  });
}
