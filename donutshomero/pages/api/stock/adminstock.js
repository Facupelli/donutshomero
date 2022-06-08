import prisma from "../../../lib/prisma";

export default async function adminstock(req, res) {
  if (req.method === "PUT") {
    try {
      const donuts = req.body;

      await prisma.$transaction(
        donuts.map((donut) =>
          prisma.donut.update({
            where: { id: donut.id },
            data: {
              stock: Number(donut.data.newStock),
              available: donut.data.available === 'true' ? true : false,
            },
          })
        )
      );

      res.json({ message: "updated successfully" });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only put" });
  }
}
