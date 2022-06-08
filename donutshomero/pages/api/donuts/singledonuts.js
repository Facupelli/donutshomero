import prisma from "../../../lib/prisma";

export default async function adminstock(req, res) {
  if (req.method === "GET") {
    try {
      const singleDonuts = await prisma.donut.findMany({});

      res.json(singleDonuts);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only get" });
  }
}
