import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";
import nookies from "nookies";

export default async function login(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await prisma.admin.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const userForToken = {
      id: user.id,
      email: user.email,
      password,
    };

    const token = jwt.sign(userForToken, process.env.TOKEN_SECRET_WORD, {
      expiresIn: "60m",
    });

    nookies.set({ res }, "auth", token, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      domain: "https://donutshomero.vercel.app",
    });

    res.json({
      message: "Logged in successfully",
      token,
    });
  } else {
    // Handle any other HTTP method
    res.status(500).json({ error: "only post" });
  }
}
