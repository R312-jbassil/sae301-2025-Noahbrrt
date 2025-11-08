import OpenAI from "openai";

export async function POST({ request }) {
  const MODEL = "openai/gpt-oss-20b:free"; 
  const BASE_URL = "https://openrouter.ai/api/v1";
  const API_KEY = import.meta.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;

  if (!API_KEY) {
    return new Response(
      JSON.stringify({ svg: "", error: "Missing OPENROUTER_API_KEY" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const messages = Array.isArray(body)
      ? body
      : [{ role: "user", content: body?.prompt ?? "" }];

    const origin = request.headers.get("origin") || "http://localhost:4321";

    const client = new OpenAI({
      apiKey: API_KEY,
      baseURL: BASE_URL,
      defaultHeaders: {
        "HTTP-Referer": origin,
        "X-Title": "TaVue IA Generator",
      },
    });

    const systemMsg = {
      role: "system",
      content:
        "You are an SVG generator. Reply with ONE valid <svg>...</svg> only. " +
        "For glasses, include ids: #monture, #branches, #verres. No extra commentary.",
    };


    const model = import.meta.env.OPENROUTER_MODEL || process.env.OPENROUTER_MODEL || "openai/gpt-oss-20b:free";

    const apiKey = import.meta.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY missing");
      return new Response(JSON.stringify({ svg: "", error: "Server misconfigured: missing OPENROUTER_API_KEY" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    console.log("generateSVG: using model=", model);

    const res = await client.chat.completions.create({
      model,
      messages: [systemMsg, ...messages],
      temperature: 0.6,
    });

    const content =
      res?.choices?.[0]?.message?.content ||
      res?.choices?.[0]?.text ||
      "";

    const svgMatch = content.match(/<svg[\s\S]*?<\/svg>/i);
    const svg = svgMatch ? svgMatch[0] : "";

    return new Response(JSON.stringify({ svg }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("generateSVG error:", err);
    return new Response(
      JSON.stringify({ svg: "", error: String(err?.message || err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
