import prisma from "../../../../lib/prisma";

export default async function paymentStatus(req, res) {
  if (req.method === "PUT") {
    try {
      const { id, paymentStatus } = req.body;

      
      let status = paymentStatus === true ? "APPROVED" : "PENDING";

      await prisma.order.update({
        where: { id },
        data: {
          paymentStatus: status,
        },
      });

      res.json({ message: "updated successfully" });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only put" });
  }
}