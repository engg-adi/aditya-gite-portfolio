export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages.slice(-12) : [];
    const portfolio = `You are Aditya Gite's portfolio AI agent. Answer questions about Aditya using ONLY this portfolio context. Be concise, friendly, professional, and helpful. If something is not in the context, say you do not have that information. Do not invent project URLs, achievements, grades, employers, or experience. Portfolio context: Name: Aditya Bhausaheb Gite. Fourth-year B.Tech student specializing in Artificial Intelligence and Data Science at Amrutvahini College of Engineering, Sangamner. Skills: Python, SQL, HTML, CSS, Data Science, Machine Learning, Pandas, NumPy, Matplotlib, Scikit-learn, Node.js, Express.js, MongoDB, AWS, Power BI, GitHub. Projects: Sales Data Analysis; AI in Veterinary Diagnosis; Automated Assignment Grading; YOLO/Object Detection; Enterprise Retail Intelligence; Employee Management System. Internship/training: offline Data Science Internship; online ML & Data Science, AWS, and Data Analytics with Python and Power BI. Certifications mentioned: Oracle Data Analysis, Data Science, MATLAB. GitHub: https://github.com/engg-adi. LinkedIn: https://www.linkedin.com/in/aditya-gite-2402a827/. Email: agite4381@gmail.com. Phone: +91 83295 49122. Goal: build a career in Artificial Intelligence and Data Science.`;
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: "gpt-5.6", instructions: portfolio, input: messages })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || "OpenAI request failed" });
    return res.status(200).json({ reply: data.output_text || "Sorry, I could not generate a response." });
  } catch (error) {
    return res.status(500).json({ error: "Agent request failed" });
  }
}
