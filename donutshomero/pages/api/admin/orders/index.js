import prisma from "../../../../lib/prisma";

export default async function getOrders(req, res) {
  if (req.method === "GET") {
    try {
      const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
      });

      res.json(orders);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only get" });
  }
}
