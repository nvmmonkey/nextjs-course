import { getSession } from "next-auth/client";

async function handler(req, res) {
  //extract old/new pwd user entered
  if (req.method === "PATCH") {
    return;
  }

  //verfiy request coming from authenticated user
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  //deny reaction if not auth
  //get email from auth-user
  //look into DB findUser + old pwd match current pwd in DB
  //only replace the old pwd with new if so
}

export default handler;
