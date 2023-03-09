import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    const newsletter = {
      id: new Date().toISOString(),
      email: email,
    };

    return res
      .status(201)
      .json({ message: "Successfully sent!", newsletter: newsletter });
  } else {
    return res.status(200).json({ message: "Connected!" });
  }
}

export default handler;
