export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array required" });
  }

  const systemContext = process.env.CHATBOT_CONTEXT;

  const hasSystemMessage = messages.some(
    (msg) => msg.role === "user" && msg.content.includes(systemContext)
  );

  if (!hasSystemMessage) {
    messages = [
      { role: "user", content: systemContext },
      ...messages,
    ];
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({
      reply: {
        role: "assistant",
        content: reply || "Sorry, I couldn't generate a response.",
      },
    });
  } catch (err) {
    console.error("Gemini API call failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
