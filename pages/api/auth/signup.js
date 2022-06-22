import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { hashPassword } from "../../../lib/auth-password";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      if (!password || password.trim().length < 8) {
        res.status(422).json({
          message:
            "Invalid input - check that the password is at least 8 characters long",
        });
        return;
      }

      const existingUser = await User.findOne({ username: username });

      if (existingUser) {
        res.status(422).json({ message: "User already exists" });
        return;
      }

      const hashedPassword = await hashPassword(password);

      const createdUser = new User({
        username: username,
        password: hashedPassword,
      });
      createdUser.save();

      res.status(201).json({ message: "Created user!" });
    } catch (error) {
      console.log(error);
    }
  }
}
