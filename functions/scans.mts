import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  try {
    const { image } = await req.json();

    const openai = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Netlify.env.get("OPENAI_API_KEY")}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: "Identify this crystal and explain meaning, energy, psychological association and practical use in simple clear language." },
              {
                type: "input_image",
                image_base64: image
              }
            ]
          }
        ]
      })
    });

    const data = await openai.json();

    return new Response(JSON.stringify({
      result: data.output[0].content[0].text
    }), { headers: { "Content-Type": "application/json" } });

  } catch (e) {
    return new Response(JSON.stringify({ error: "scan failed" }), { status: 500 });
  }
};
