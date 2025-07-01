import fs from "fs";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const CREDENTIALS_PATH = "../../credentials.json"; // Download this from Google Cloud Console
const TOKEN_PATH = "../../token.json"; 

export async function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH)));
  } else {
    throw new Error("Token not found. Run the OAuth flow first.");
  }

  return oAuth2Client;
}

export async function checkUnreadEmails(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.list({
    userId: "me",
    labelIds: ["INBOX"],
    q: "is:unread",
    maxResults: 5,
  });

  const messages = res.data.messages || [];
  const emailContents = [];

  for (const msg of messages) {
    const fullMail = await gmail.users.messages.get({ userId: "me", id: msg.id });
    const parts = fullMail.data.payload.parts || [];
    let body = "";

    for (const part of parts) {
      if (part.mimeType === "text/plain" && part.body.data) {
        body = Buffer.from(part.body.data, "base64").toString("utf-8");
        break;
      }
    }

    const subjectHeader = fullMail.data.payload.headers.find(h => h.name === "Subject");
    emailContents.push({
      subject: subjectHeader?.value || "(no subject)",
      body: body || "(no body)",
    });
  }

  return emailContents;
}
