import { createPB } from "../utils/pb.js";

export const onRequest = async (context, next) => {
  const pb = createPB();
  context.locals.user = null;

  const cookie = context.cookies.get("pb_auth")?.value;
  if (cookie) {
    pb.authStore.loadFromCookie(cookie);
    try {
      await pb.collection("users").authRefresh();
      context.locals.user = pb.authStore.record || null;
      context.cookies.set("pb_auth", pb.authStore.exportToCookie(), {
        path: "/", httpOnly: true, sameSite: "strict",
      });
    } catch {
      pb.authStore.clear();
      context.locals.user = null;
      context.cookies.delete("pb_auth", { path: "/" });
    }
  }

  const path = context.url.pathname;
  const isApi = path.startsWith("/api/");

  const publicApi =
    path === "/api/login" ||
    path === "/api/logout" ||
    path === "/api/signup";

  const publicPages =
    path === "/login" ||
    path === "/signup" ||
    path === "/";

  if (isApi && !publicApi && !context.locals.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { "Content-Type": "application/json" },
    });
  }
  if (!isApi && !publicPages && !context.locals.user) {
    return Response.redirect(new URL("/login", context.url), 303);
  }

  return next();
};
