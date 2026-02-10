import fetch from "node-fetch";

export async function handler(event, context) {
  const body = JSON.parse(event.body);
  const imageBase64 = body.image;

  const apiKey = process.env.OPENAI_API_KEY;import fetch from "node-fetch";

export async function handler(event, context) {
  const body = JSON.parse(event.body);
  const imageBase64 = body.image;

  const apiKey = process.env.OPENAI_API_KEY; // Dein echter Key aus Netlify Environment

  try {
    const resp = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        input: `Identify the crystal in this photo and explain its meaning, symbolism, and recommended usage: ${imageBase64}`,
        store: true
      })
    });
    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch(err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}


  try {
    const resp = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        input: `Identify the crystal in this photo and explain its meaning, symbolism, and recommended usage: ${imageBase64}`,
        store: true
      })
    });
    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch(err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
