import prisma from "../../../../lib/prisma";

export default async function getOrders(req, res) {
  if (req.method === "GET") {
    try {
      const { skip, take } = req.query;

      const orders = await prisma.$transaction([
        prisma.order.count(),
        prisma.order.findMany({
          // include: { singleDonuts: true, promoDonuts: true },
          skip: Number(skip),
          take: Number(take),
          orderBy: { createdAt: "desc" },
          include: { customer: true },
        }),
      ]);

      const data = {
        totalOrders: orders[0],
        orders: orders[1],
      };

      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only get" });
  }
}
