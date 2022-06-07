import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

export default async function register(req, res) {
  if (req.method === "POST") {
    try {
      const { email, role, password } = req.body;

      const isUserExist = await prisma.admin.findUnique({
        where: { email },
      });

      if (isUserExist) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await prisma.admin.create({
        data: {
          role,
          email,
          passwordHash,
        },
      });

      res.status(201).json(newUser); // 201 succes when creating
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } else {
    res.status(500).json({ error: "only post" });
  }
}
