import { hashPassword } from "../../../helper/auth-utils";
import { ConnectMongoDB, insertUser } from "../../../helper/db-utils";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid input -- password should be at least 7 characters!",
    });
    return;
  }

  const hashedPassword = await hashPassword(password);

  //create an storing object
  const newUser = {
    email: email,
    password: hashedPassword,
  };

  try {
    await ConnectMongoDB();
  } catch (error) {
    res.status(500).json({ message: "Failing connecting to DB!" });
    return;
  }

  try {
    await insertUser(newUser);
    res.status(201).json({ message: "Successfully signup!" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error signning up!" });
    return;
  }
}

export default handler;
