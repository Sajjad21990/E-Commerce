import connectDB from "../../../helpers/connectDB";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../../../helpers/generateTokens";
import Users from "../../../models/userModel";

connectDB();

export default async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(400).json({ err: "Please login to continue" });

    const result = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!result) return res.status(400).json({ err: "Invalid Token" });

    const user = await Users.findById(result.id);

    if (!user) return res.status(400).json({ err: "user does not exist" });

    const accessToken = createAccessToken({ id: user._id });

    return res.status(200).json({
      accessToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error.message });
  }
};
