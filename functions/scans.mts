import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  try {

    const { image } = await req.json();

    const apiKey = Netlify.env.get("OPEN_AI_API_KEY");

    const openai = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: "Identify this crystal and explain meaning shortly." },
              { type: "input_image", image_url: image }
            ]
          }
        ]
      })
    });

    const data = await openai.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Scan failed" }), { status: 500 });
  }
};
