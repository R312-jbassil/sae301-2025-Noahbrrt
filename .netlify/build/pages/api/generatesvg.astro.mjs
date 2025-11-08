import OpenAI from 'openai';
export { renderers } from '../../renderers.mjs';

async function POST({ request }) {
  const BASE_URL = "https://openrouter.ai/api/v1";
  const API_KEY = "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";
  try {
    const body = await request.json().catch(() => ({}));
    const messages = Array.isArray(body) ? body : [{ role: "user", content: body?.prompt ?? "" }];
    const origin = request.headers.get("origin") || "http://localhost:4321";
    const client = new OpenAI({
      apiKey: API_KEY,
      baseURL: BASE_URL,
      defaultHeaders: {
        "HTTP-Referer": origin,
        "X-Title": "TaVue IA Generator"
      }
    });
    const systemMsg = {
      role: "system",
      content: "You are an SVG generator. Reply with ONE valid <svg>...</svg> only. For glasses, include ids: #monture, #branches, #verres. No extra commentary."
    };
    const model = undefined                                 || process.env.OPENROUTER_MODEL || "openai/gpt-oss-20b:free";
    const apiKey = "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";
    if (!apiKey) ;
    console.log("generateSVG: using model=", model);
    const res = await client.chat.completions.create({
      model,
      messages: [systemMsg, ...messages],
      temperature: 0.6
    });
    const content = res?.choices?.[0]?.message?.content || res?.choices?.[0]?.text || "";
    const svgMatch = content.match(/<svg[\s\S]*?<\/svg>/i);
    const svg = svgMatch ? svgMatch[0] : "";
    return new Response(JSON.stringify({ svg }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("generateSVG error:", err);
    return new Response(
      JSON.stringify({ svg: "", error: String(err?.message || err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
