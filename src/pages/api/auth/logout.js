import { query } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false });
  }

  try {
    const sessionToken = req.cookies?.session;

    if (sessionToken) {
      await query("DELETE FROM sessions WHERE session_token = $1", [sessionToken]);
    }

    res.setHeader(
      "Set-Cookie",
      "session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure"
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(200).json({ success: true });
  }
}
