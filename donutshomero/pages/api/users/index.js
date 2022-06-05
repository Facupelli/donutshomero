import prisma from "../../../lib/prisma";
import axios from "axios";

export default async function usersController(req, res) {
  // Crea un objeto de preferencia
  if (req.method === "POST") {
    try {
      const phoneNumber = req.body.number;

      const user = await prisma.user.findUnique({
        where: {
          phone: phoneNumber,
        },
        select: {
          name: true,
          surname: true,
          address: true,
          addressNumber: true,
          phone: true,
          ubiLink: true,
        },
      });

      if (!user) {
        res.json({ message: "user not found" });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only get" });
  }
}
