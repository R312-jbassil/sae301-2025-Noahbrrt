import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_CRDH0bDr.mjs';
import 'clsx';
import 'cookie';
import './chunks/shared_9gEenf6c.mjs';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/","cacheDir":"file:///C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/node_modules/.astro/","outDir":"file:///C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/dist/","srcDir":"file:///C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/","publicDir":"file:///C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/public/","buildClientDir":"file:///C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/dist/","buildServerDir":"file:///C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/generatesvg","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/generateSVG\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"generateSVG","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/generateSVG.js","pathname":"/api/generateSVG","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/login","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/login\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/login.js","pathname":"/api/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/logout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/logout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/logout.js","pathname":"/api/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/lunettes/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/lunettes\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"lunettes","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/lunettes/[id].js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/savesvg","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/saveSVG\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"saveSVG","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/saveSVG.js","pathname":"/api/saveSVG","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signup","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signup\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signup.js","pathname":"/api/signup","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/updatesvg","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/updateSVG\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"updateSVG","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/updateSVG.js","pathname":"/api/updateSVG","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/configurateur.BVpzKjEX.css"}],"routeData":{"route":"/configurateur","isIndex":false,"type":"page","pattern":"^\\/configurateur\\/?$","segments":[[{"content":"configurateur","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/configurateur.astro","pathname":"/configurateur","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/configurateur.BVpzKjEX.css"}],"routeData":{"route":"/galerie","isIndex":false,"type":"page","pattern":"^\\/galerie\\/?$","segments":[[{"content":"galerie","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/galerie.astro","pathname":"/galerie","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/configurateur.BVpzKjEX.css"}],"routeData":{"route":"/ia-generator","isIndex":false,"type":"page","pattern":"^\\/ia-generator\\/?$","segments":[[{"content":"ia-generator","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ia-generator.astro","pathname":"/ia-generator","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/configurateur.BVpzKjEX.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/configurateur.BVpzKjEX.css"}],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/configurateur.BVpzKjEX.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/pages/configurateur.astro",{"propagation":"none","containsHead":true}],["C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/pages/galerie.astro",{"propagation":"none","containsHead":true}],["C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/pages/ia-generator.astro",{"propagation":"none","containsHead":true}],["C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/pages/signup.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/generateSVG@_@js":"pages/api/generatesvg.astro.mjs","\u0000@astro-page:src/pages/api/login@_@js":"pages/api/login.astro.mjs","\u0000@astro-page:src/pages/api/logout@_@js":"pages/api/logout.astro.mjs","\u0000@astro-page:src/pages/api/lunettes/[id]@_@js":"pages/api/lunettes/_id_.astro.mjs","\u0000@astro-page:src/pages/api/saveSVG@_@js":"pages/api/savesvg.astro.mjs","\u0000@astro-page:src/pages/api/signup@_@js":"pages/api/signup.astro.mjs","\u0000@astro-page:src/pages/api/updateSVG@_@js":"pages/api/updatesvg.astro.mjs","\u0000@astro-page:src/pages/configurateur@_@astro":"pages/configurateur.astro.mjs","\u0000@astro-page:src/pages/galerie@_@astro":"pages/galerie.astro.mjs","\u0000@astro-page:src/pages/ia-generator@_@astro":"pages/ia-generator.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CZZPDmUr.mjs","C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/hero.6iHtSfq4.webp","/_astro/img_home.Co2fsFUB.webp","/_astro/lunettes.DDyR8ohV.svg","/_astro/facebook.Beu5CWvw.svg","/_astro/TaVue.JqyFdKrJ.svg","/_astro/basket.DihlupJe.svg","/_astro/twitter.DCyDHOSH.svg","/_astro/instagram.CwlANz4f.svg","/_astro/configurateur.BVpzKjEX.css","/favicon.svg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"gEK6SDTlq51inb8NXtIZUpOHYZHOVIFm+DqKhWYidEo=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
