import prisma from "../../../../lib/prisma";

export default async function adminstock(req, res) {
  if (req.method === "PUT") {
    try {
      const { id, deilverStatus } = req.body;

      
      let status = deilverStatus === true ? "DELIVERED" : "PENDING";

      await prisma.order.update({
        where: { id },
        data: {
          deliverStatus: status,
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
