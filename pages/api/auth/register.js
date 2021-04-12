import connectDB from "../../../helpers/connectDB";
import Users from "../../../models/userModel";
import valid from "../../../helpers/valid";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const errMsg = valid(name, email, password, confirmPassword);

    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await Users.findOne({ email });

    if (user)
      return res.status(400).json({ err: "user with email already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new Users({ name, email, password: hashedPassword });

    await newUser.save();

    return res.status(200).json({ msg: "User Registration Successfull" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error.message });
  }
};
