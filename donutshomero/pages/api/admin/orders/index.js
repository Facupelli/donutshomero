import prisma from "../../../../lib/prisma";

export default async function getOrders(req, res) {
  if (req.method === "GET") {
    try {
      const { skip, take, date } = req.query;

      const orders = await prisma.$transaction([
        prisma.order.findMany({
          where: {
            createdAt: {
              gte: date === "all" ? undefined : `${date}T00:00:00.000Z`,
            },
          },
          skip: Number(skip),
          take: Number(take),
          orderBy: { createdAt: "desc" },
          include: { customer: true },
        }),
        prisma.order.count({
          where: {
            createdAt: {
              gte: date === "all" ? undefined : `${date}T00:00:00.000Z`,
            },
          },
        }),
      ]);

      const data = {
        totalOrders: orders[1],
        orders: orders[0],
      };

      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only get" });
  }
}
