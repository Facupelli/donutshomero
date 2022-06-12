import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";
import cookie from "cookie";

export default async function login(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.passwordHash);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const userForToken = {
      id: admin.id,
      email: admin.email,
      // password,
    };

    const token = jwt.sign(userForToken, process.env.TOKEN_SECRET_WORD, {
      expiresIn: "60m",
    });

    const authCookie = cookie.serialize("auth", token, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      httpOnly: true,
    });

    res.setHeader("Set-Cookie", authCookie);
    res.json({
      message: "Logged in successfully",
    });
  } else {
    // Handle any other HTTP method
    res.status(500).json({ error: "only post" });
  }
}
