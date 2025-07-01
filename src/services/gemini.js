import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function isInternshipEmail(email) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const prompt = `
You are an assistant helping a student find internships.
Given this email subject and body, respond with only “Yes” or “No” — is it about a job or internship opportunity?

Subject: ${email.subject}
Body: ${email.body}
  `.trim();

  try {
    const res = await axios.post(url, {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    });

    const output = res.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase();
    return output.includes("yes");

  } catch (err) {
    console.error("❌ Gemini API error:", err.response?.data || err.message);
    throw err;
  }
}
