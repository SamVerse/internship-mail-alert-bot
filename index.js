import dotenv from "dotenv";
import cron from "node-cron";
import { authorize, checkUnreadEmails } from "./src/services/gmail.js";
import { isInternshipEmail } from "./src/services/gemini.js";
import { sendTelegramMessage } from "./src/services/telegram.js";

dotenv.config();

async function checkForEmails() {
  try {
    const auth = await authorize();
    const emails = await checkUnreadEmails(auth);
    console.log("✅ Emails fetched:", emails.length);

    for (const email of emails) {
      try {
        const isRelevant = await isInternshipEmail(email);
        if (isRelevant) {
          await sendTelegramMessage(`📧 New Internship Email:\nSubject: ${email.subject}\n\n${email.body.slice(0, 200)}...`);
        } else {
          console.log("❌ Skipped email:", email.subject);
        }
      } catch (err) {
        console.error("❌ Gemini or Telegram failed:", err.message);
      }
    }

    console.log("✅ Done checking emails.");
  } catch (err) {
    console.error("❌ Global error:", err.message);
  }
}

//  Run immediately once on startup
// checkForEmails();

// ⏰ Then run every 10 minutes
cron.schedule("*/10 * * * *", () => {
  console.log("🔁 Running scheduled email check at", new Date().toLocaleTimeString());
  checkForEmails();
});
