import { d as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CRDH0bDr.mjs';
import { $ as $$Layout } from '../chunks/Layout_D1VYXbu9.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$IaGenerator = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "G\xE9n\xE9rateur IA \u2013 SVG lunettes" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<section class="mx-auto max-w-6xl px-4 py-8 space-y-6"> <header class="space-y-1"> <h1 class="text-2xl font-semibold">G\xE9n\xE9rer / \xE9diter un SVG avec l\u2019IA</h1> <p class="text-sm text-gray-600">
\xC9cris un prompt (ex: \u201Clunettes aviateur, branches noires, verres fum\xE9s\u201D).
</p> </header> <div class="grid gap-6 md:grid-cols-2"> <div class="rounded-2xl border bg-white shadow-xl"> <div class="flex items-center justify-between px-4 py-3 border-b"> <h3 class="text-sm font-semibold">Aper\xE7u</h3> <span class="text-xs text-gray-500">Rendu SVG</span> </div> <div id="svg-container" class="m-4 flex min-h-[420px] items-center justify-center rounded-lg border bg-gradient-to-br from-white to-gray-50 shadow-inner p-4"> <em class="text-xs text-gray-500">Le SVG g\xE9n\xE9r\xE9 s\u2019affichera ici</em> </div> </div> <div class="rounded-2xl border bg-white h-full shadow-xl"> <div class="flex items-center justify-between px-4 py-3 border-b"> <h3 class="text-sm font-semibold">SVG (copiable)</h3> <span class="text-xs text-gray-500">Code</span> </div> <pre id="svg-output" role="status" aria-live="polite" class="m-4 h-[420px] overflow-auto rounded-lg bg-gradient-to-b from-white to-gray-50 p-4 text-xs leading-6 shadow-inner border border-gray-100"></pre> </div> </div> <div class="rounded-2xl border bg-white shadow-xl"> <div class="px-4 py-3 border-b flex items-center justify-between"> <h3 class="text-sm font-semibold">Historique</h3> <span class="text-xs text-gray-500">Contexte IA</span> </div> <div id="chat-history" class="px-4 py-4 max-h-64 overflow-auto space-y-3"> <div class="text-xs text-gray-500">
Aucun \xE9change pour l\u2019instant. R\xE9dige un prompt ci-dessous.
</div> </div> <div class="border-t px-4 py-4"> <label for="user-prompt" class="sr-only">Votre message</label> <textarea id="user-prompt" rows="3" class="w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 shadow-sm" placeholder="D\xE9cris la paire ou l'\xE9dition voulue\u2026"></textarea> <div class="mt-3 flex flex-wrap items-center justify-end gap-2"> <button id="generate-button" class="rounded-lg bg-black px-4 py-2 text-white text-sm hover:bg-gray-900 transition transform hover:-translate-y-0.5 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black/10">
G\xE9n\xE9rer
</button> <button id="edit-button" class="rounded-lg bg-gray-800 px-4 py-2 text-white text-sm hover:bg-gray-900 transition transform hover:-translate-y-0.5 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black/10">
\xC9diter
</button> <button id="save-button" class="rounded-lg bg-emerald-600 px-4 py-2 text-white text-sm hover:bg-emerald-700 transition transform hover:-translate-y-0.5 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-600/30">
Sauvegarder
</button> </div> </div> </div> </section> <script>
 
  let promptList = [];
  window.promptList = promptList;
  let currentId = null; 

  const textarea = document.getElementById('user-prompt');
  const svgContainer = document.getElementById('svg-container');
  const svgOutput = document.getElementById('svg-output');
  const btnGen = document.getElementById('generate-button');
  const btnEdit = document.getElementById('edit-button');
  const btnSave = document.getElementById('save-button');
  const chatEl = document.getElementById('chat-history');

  async function callGenerate(messages) {
    const res = await fetch('/api/generateSVG', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messages),
    });
    return await res.json(); 
  }

  async function fetchLunetteById(id) {
    const r = await fetch(\`/api/lunettes/\${id}\`, { credentials: 'include' });
    return await r.json(); 
  }

  async function saveToPB(params) {
    const res = await fetch('/api/saveSVG', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(params),
    });
    return await res.json();
  }

  async function updateToPB(params) {
    const res = await fetch('/api/updateSVG', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(params),
    });
    return await res.json();
  }

  function showLoading() {
    svgContainer.innerHTML = \`
      <div class="flex flex-col items-center gap-2">
        <span class="loading loading-ring loading-xl"></span>
        <span class="text-sm text-gray-500">G\xE9n\xE9ration en cours\u2026</span>
      </div>\`;
    if (svgOutput) svgOutput.textContent = 'G\xE9n\xE9ration en cours\u2026';
    btnGen.disabled = true;
    btnEdit.disabled = true;
  }

  function stopLoading() {
    btnGen.disabled = false;
    btnEdit.disabled = false;
    if (svgOutput && svgOutput.textContent.trim() === 'G\xE9n\xE9ration en cours\u2026') {
      svgOutput.textContent = '';
    }
  }

  function renderChat() {
    if (!window.promptList || window.promptList.length === 0) {
      chatEl.innerHTML = '<div class="text-xs text-gray-500">Aucun \xE9change pour l\u2019instant. R\xE9dige un prompt ci-dessous.</div>';
      return;
    }
    chatEl.innerHTML = window.promptList.map((m) => {
      const mine = m.role === 'user';
      const bubble =
        m.content && m.content.trim().startsWith('<svg')
          ? '[SVG g\xE9n\xE9r\xE9]'
          : m.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return \`
        <div class="flex \${mine ? 'justify-end' : 'justify-start'}">
          <div class="max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-5 \${
            mine ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 border'
          }">
            <span class="block text-[10px] opacity-70 mb-1">\${mine ? 'Vous' : 'IA'}</span>
            <div class="whitespace-pre-wrap break-words">\${bubble}</div>
          </div>
        </div>
      \`;
    }).join('');
    chatEl.scrollTop = chatEl.scrollHeight;
  }

  const refreshChat = () => setTimeout(renderChat, 30);

  async function handleGenerate() {
    const prompt = textarea.value.trim();
    if (!prompt) { alert('\xC9cris un prompt.'); return; }

    promptList = [{ role: 'user', content: prompt }];
    window.promptList = promptList;
    showLoading();

    const data = await callGenerate(promptList);
    if (data.error) {
      svgContainer.innerHTML = \`<div style="color:#b91c1c">Erreur serveur : \${data.error}</div>\`;
      svgOutput.textContent = '';
      stopLoading();
      return;
    }

    const svg = data.svg || '';
    svgOutput.textContent = svg;
    svgContainer.innerHTML = svg || '<em>Aucun SVG renvoy\xE9</em>';
    stopLoading();

    promptList.push({ role: 'assistant', content: svg });
    window.promptList = promptList;
    renderChat();
  }

  async function handleEdit() {
    const editInstruction = textarea.value.trim();
    if (!editInstruction) { alert('\xC9cris une instruction d\u2019\xE9dition.'); return; }
    if (promptList.length === 0) { alert('G\xE9n\xE8re d\u2019abord un SVG.'); return; }

    promptList.push({ role: 'user', content: editInstruction });
    window.promptList = promptList;
    showLoading();

    const data = await callGenerate(promptList);
    if (data.error) {
      svgContainer.innerHTML = \`<div style="color:#b91c1c">Erreur serveur : \${data.error}</div>\`;
      svgOutput.textContent = '';
      stopLoading();
      return;
    }

    const svg = data.svg || '';
    svgOutput.textContent = svg;
    svgContainer.innerHTML = svg || '<em>Aucun SVG renvoy\xE9</em>';
    stopLoading();

    promptList.push({ role: 'assistant', content: svg });
    window.promptList = promptList;
    renderChat();
  }

  async function handleSave() {
    const svgCode = document.getElementById('svg-output')?.textContent?.trim() || '';
    if (!svgCode || !svgCode.startsWith('<svg')) {
      alert('Aucun SVG \xE0 sauvegarder. G\xE9n\xE9re d\u2019abord un visuel.');
      return;
    }

    const nom = prompt('Nom de la paire de lunettes ?') || 'G\xE9n\xE9ration IA';
    const lastUserPrompt = (window.promptList || []).slice().reverse().find(m => m.role === 'user')?.content || '';

    const params = {
      nom_lunette: nom,
      code_svg: svgCode,
      prompt_ia: lastUserPrompt,
      chat_history: JSON.stringify(window.promptList || []),
      prix: 149,
      genere_IA: true,
    };

    const res = currentId
      ? await updateToPB({ id: currentId, ...params })
      : await saveToPB(params);

    if (res.success) {
      currentId = res.id || currentId;
      alert(\`SVG sauvegard\xE9 \u2705 (id: \${currentId})\`);
    } else {
      alert('Erreur sauvegarde : ' + (res.error?.message || res.error));
    }
  }

  (async function bootFromQuery() {
    const id = new URLSearchParams(location.search).get('id');
    if (!id) return;

    const { success, item, error } = await fetchLunetteById(id);
    if (!success) {
      alert('Impossible de charger la g\xE9n\xE9ration IA.');
      return;
    }

    if (!item.genere_IA) {
      location.replace(\`/configurateur?id=\${item.id}\`);
      return;
    }

    svgContainer.innerHTML = item.code_svg || '<em>Aucun SVG</em>';
    svgOutput.textContent = item.code_svg || '';

    try {
      promptList = item.chat_history ? JSON.parse(item.chat_history) : [];
      window.promptList = promptList;
    } catch {}
    if (textarea && item.prompt_ia) textarea.value = item.prompt_ia;
    currentId = item.id;
    renderChat();
  })();

  btnGen?.addEventListener('click', handleGenerate);
  btnEdit?.addEventListener('click', handleEdit);
  btnSave?.addEventListener('click', handleSave);
<\/script> `], [" ", `<section class="mx-auto max-w-6xl px-4 py-8 space-y-6"> <header class="space-y-1"> <h1 class="text-2xl font-semibold">G\xE9n\xE9rer / \xE9diter un SVG avec l\u2019IA</h1> <p class="text-sm text-gray-600">
\xC9cris un prompt (ex: \u201Clunettes aviateur, branches noires, verres fum\xE9s\u201D).
</p> </header> <div class="grid gap-6 md:grid-cols-2"> <div class="rounded-2xl border bg-white shadow-xl"> <div class="flex items-center justify-between px-4 py-3 border-b"> <h3 class="text-sm font-semibold">Aper\xE7u</h3> <span class="text-xs text-gray-500">Rendu SVG</span> </div> <div id="svg-container" class="m-4 flex min-h-[420px] items-center justify-center rounded-lg border bg-gradient-to-br from-white to-gray-50 shadow-inner p-4"> <em class="text-xs text-gray-500">Le SVG g\xE9n\xE9r\xE9 s\u2019affichera ici</em> </div> </div> <div class="rounded-2xl border bg-white h-full shadow-xl"> <div class="flex items-center justify-between px-4 py-3 border-b"> <h3 class="text-sm font-semibold">SVG (copiable)</h3> <span class="text-xs text-gray-500">Code</span> </div> <pre id="svg-output" role="status" aria-live="polite" class="m-4 h-[420px] overflow-auto rounded-lg bg-gradient-to-b from-white to-gray-50 p-4 text-xs leading-6 shadow-inner border border-gray-100"></pre> </div> </div> <div class="rounded-2xl border bg-white shadow-xl"> <div class="px-4 py-3 border-b flex items-center justify-between"> <h3 class="text-sm font-semibold">Historique</h3> <span class="text-xs text-gray-500">Contexte IA</span> </div> <div id="chat-history" class="px-4 py-4 max-h-64 overflow-auto space-y-3"> <div class="text-xs text-gray-500">
Aucun \xE9change pour l\u2019instant. R\xE9dige un prompt ci-dessous.
</div> </div> <div class="border-t px-4 py-4"> <label for="user-prompt" class="sr-only">Votre message</label> <textarea id="user-prompt" rows="3" class="w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 shadow-sm" placeholder="D\xE9cris la paire ou l'\xE9dition voulue\u2026"></textarea> <div class="mt-3 flex flex-wrap items-center justify-end gap-2"> <button id="generate-button" class="rounded-lg bg-black px-4 py-2 text-white text-sm hover:bg-gray-900 transition transform hover:-translate-y-0.5 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black/10">
G\xE9n\xE9rer
</button> <button id="edit-button" class="rounded-lg bg-gray-800 px-4 py-2 text-white text-sm hover:bg-gray-900 transition transform hover:-translate-y-0.5 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black/10">
\xC9diter
</button> <button id="save-button" class="rounded-lg bg-emerald-600 px-4 py-2 text-white text-sm hover:bg-emerald-700 transition transform hover:-translate-y-0.5 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-600/30">
Sauvegarder
</button> </div> </div> </div> </section> <script>
 
  let promptList = [];
  window.promptList = promptList;
  let currentId = null; 

  const textarea = document.getElementById('user-prompt');
  const svgContainer = document.getElementById('svg-container');
  const svgOutput = document.getElementById('svg-output');
  const btnGen = document.getElementById('generate-button');
  const btnEdit = document.getElementById('edit-button');
  const btnSave = document.getElementById('save-button');
  const chatEl = document.getElementById('chat-history');

  async function callGenerate(messages) {
    const res = await fetch('/api/generateSVG', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messages),
    });
    return await res.json(); 
  }

  async function fetchLunetteById(id) {
    const r = await fetch(\\\`/api/lunettes/\\\${id}\\\`, { credentials: 'include' });
    return await r.json(); 
  }

  async function saveToPB(params) {
    const res = await fetch('/api/saveSVG', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(params),
    });
    return await res.json();
  }

  async function updateToPB(params) {
    const res = await fetch('/api/updateSVG', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(params),
    });
    return await res.json();
  }

  function showLoading() {
    svgContainer.innerHTML = \\\`
      <div class="flex flex-col items-center gap-2">
        <span class="loading loading-ring loading-xl"></span>
        <span class="text-sm text-gray-500">G\xE9n\xE9ration en cours\u2026</span>
      </div>\\\`;
    if (svgOutput) svgOutput.textContent = 'G\xE9n\xE9ration en cours\u2026';
    btnGen.disabled = true;
    btnEdit.disabled = true;
  }

  function stopLoading() {
    btnGen.disabled = false;
    btnEdit.disabled = false;
    if (svgOutput && svgOutput.textContent.trim() === 'G\xE9n\xE9ration en cours\u2026') {
      svgOutput.textContent = '';
    }
  }

  function renderChat() {
    if (!window.promptList || window.promptList.length === 0) {
      chatEl.innerHTML = '<div class="text-xs text-gray-500">Aucun \xE9change pour l\u2019instant. R\xE9dige un prompt ci-dessous.</div>';
      return;
    }
    chatEl.innerHTML = window.promptList.map((m) => {
      const mine = m.role === 'user';
      const bubble =
        m.content && m.content.trim().startsWith('<svg')
          ? '[SVG g\xE9n\xE9r\xE9]'
          : m.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return \\\`
        <div class="flex \\\${mine ? 'justify-end' : 'justify-start'}">
          <div class="max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-5 \\\${
            mine ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 border'
          }">
            <span class="block text-[10px] opacity-70 mb-1">\\\${mine ? 'Vous' : 'IA'}</span>
            <div class="whitespace-pre-wrap break-words">\\\${bubble}</div>
          </div>
        </div>
      \\\`;
    }).join('');
    chatEl.scrollTop = chatEl.scrollHeight;
  }

  const refreshChat = () => setTimeout(renderChat, 30);

  async function handleGenerate() {
    const prompt = textarea.value.trim();
    if (!prompt) { alert('\xC9cris un prompt.'); return; }

    promptList = [{ role: 'user', content: prompt }];
    window.promptList = promptList;
    showLoading();

    const data = await callGenerate(promptList);
    if (data.error) {
      svgContainer.innerHTML = \\\`<div style="color:#b91c1c">Erreur serveur : \\\${data.error}</div>\\\`;
      svgOutput.textContent = '';
      stopLoading();
      return;
    }

    const svg = data.svg || '';
    svgOutput.textContent = svg;
    svgContainer.innerHTML = svg || '<em>Aucun SVG renvoy\xE9</em>';
    stopLoading();

    promptList.push({ role: 'assistant', content: svg });
    window.promptList = promptList;
    renderChat();
  }

  async function handleEdit() {
    const editInstruction = textarea.value.trim();
    if (!editInstruction) { alert('\xC9cris une instruction d\u2019\xE9dition.'); return; }
    if (promptList.length === 0) { alert('G\xE9n\xE8re d\u2019abord un SVG.'); return; }

    promptList.push({ role: 'user', content: editInstruction });
    window.promptList = promptList;
    showLoading();

    const data = await callGenerate(promptList);
    if (data.error) {
      svgContainer.innerHTML = \\\`<div style="color:#b91c1c">Erreur serveur : \\\${data.error}</div>\\\`;
      svgOutput.textContent = '';
      stopLoading();
      return;
    }

    const svg = data.svg || '';
    svgOutput.textContent = svg;
    svgContainer.innerHTML = svg || '<em>Aucun SVG renvoy\xE9</em>';
    stopLoading();

    promptList.push({ role: 'assistant', content: svg });
    window.promptList = promptList;
    renderChat();
  }

  async function handleSave() {
    const svgCode = document.getElementById('svg-output')?.textContent?.trim() || '';
    if (!svgCode || !svgCode.startsWith('<svg')) {
      alert('Aucun SVG \xE0 sauvegarder. G\xE9n\xE9re d\u2019abord un visuel.');
      return;
    }

    const nom = prompt('Nom de la paire de lunettes ?') || 'G\xE9n\xE9ration IA';
    const lastUserPrompt = (window.promptList || []).slice().reverse().find(m => m.role === 'user')?.content || '';

    const params = {
      nom_lunette: nom,
      code_svg: svgCode,
      prompt_ia: lastUserPrompt,
      chat_history: JSON.stringify(window.promptList || []),
      prix: 149,
      genere_IA: true,
    };

    const res = currentId
      ? await updateToPB({ id: currentId, ...params })
      : await saveToPB(params);

    if (res.success) {
      currentId = res.id || currentId;
      alert(\\\`SVG sauvegard\xE9 \u2705 (id: \\\${currentId})\\\`);
    } else {
      alert('Erreur sauvegarde : ' + (res.error?.message || res.error));
    }
  }

  (async function bootFromQuery() {
    const id = new URLSearchParams(location.search).get('id');
    if (!id) return;

    const { success, item, error } = await fetchLunetteById(id);
    if (!success) {
      alert('Impossible de charger la g\xE9n\xE9ration IA.');
      return;
    }

    if (!item.genere_IA) {
      location.replace(\\\`/configurateur?id=\\\${item.id}\\\`);
      return;
    }

    svgContainer.innerHTML = item.code_svg || '<em>Aucun SVG</em>';
    svgOutput.textContent = item.code_svg || '';

    try {
      promptList = item.chat_history ? JSON.parse(item.chat_history) : [];
      window.promptList = promptList;
    } catch {}
    if (textarea && item.prompt_ia) textarea.value = item.prompt_ia;
    currentId = item.id;
    renderChat();
  })();

  btnGen?.addEventListener('click', handleGenerate);
  btnEdit?.addEventListener('click', handleEdit);
  btnSave?.addEventListener('click', handleSave);
<\/script> `])), maybeRenderHead()) })}`;
}, "C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/pages/ia-generator.astro", void 0);

const $$file = "C:/Users/ghuyt/OneDrive/Documents/GitHub/sae301-2025-Noahbrrt/src/pages/ia-generator.astro";
const $$url = "/ia-generator";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$IaGenerator,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
