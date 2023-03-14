import {
  connectMongoDB,
  insertUser,
} from "../../../components/helper/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid emaill address!" });
      return;
    }

    try {
      await connectMongoDB();
    } catch (err) {
      res.status(500).json({ message: "Failing connecting to DB!" });
      return;
    }

    try {
      await insertUser(email);
      res.status(201).json({ message: "Signup done!" });
      return;
    } catch (err) {
      res.status(500).json({ message: "Fail inserting data to DB!" });
      return;
    }
  }
}

export default handler;
