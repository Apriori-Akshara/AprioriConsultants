import { getSessionUser } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ authenticated: false });
  }

  try {
    const user = await getSessionUser(req.cookies?.session);

    if (!user || user.active === false) {
      return res.status(200).json({ authenticated: false });
    }

    return res.status(200).json({ authenticated: true });
  } catch (error) {
    console.error("Auth session check error:", error);
    return res.status(200).json({ authenticated: false });
  }
}
