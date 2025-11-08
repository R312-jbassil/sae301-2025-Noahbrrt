import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CZZPDmUr.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/generatesvg.astro.mjs');
const _page2 = () => import('./pages/api/login.astro.mjs');
const _page3 = () => import('./pages/api/logout.astro.mjs');
const _page4 = () => import('./pages/api/lunettes/_id_.astro.mjs');
const _page5 = () => import('./pages/api/savesvg.astro.mjs');
const _page6 = () => import('./pages/api/signup.astro.mjs');
const _page7 = () => import('./pages/api/updatesvg.astro.mjs');
const _page8 = () => import('./pages/configurateur.astro.mjs');
const _page9 = () => import('./pages/galerie.astro.mjs');
const _page10 = () => import('./pages/ia-generator.astro.mjs');
const _page11 = () => import('./pages/login.astro.mjs');
const _page12 = () => import('./pages/signup.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/generateSVG.js", _page1],
    ["src/pages/api/login.js", _page2],
    ["src/pages/api/logout.js", _page3],
    ["src/pages/api/lunettes/[id].js", _page4],
    ["src/pages/api/saveSVG.js", _page5],
    ["src/pages/api/signup.js", _page6],
    ["src/pages/api/updateSVG.js", _page7],
    ["src/pages/configurateur.astro", _page8],
    ["src/pages/galerie.astro", _page9],
    ["src/pages/ia-generator.astro", _page10],
    ["src/pages/login.astro", _page11],
    ["src/pages/signup.astro", _page12],
    ["src/pages/index.astro", _page13]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "89accc36-105d-40b4-9d10-fcd11320e93b"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
