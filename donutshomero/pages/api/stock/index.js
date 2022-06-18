import prisma from "../../../lib/prisma";

export default async function stock(req, res) {
  // Crea un objeto de preferencia
  if (req.method === "PUT") {
    try {
      const { cart, action } = req.body;

      if (action === "decrement") {
        await prisma.$transaction(
          cart.map((item) =>
            prisma.donut.update({
              where: { id: item.id },
              data: {
                stock: { decrement: item.quantity },
              },
            })
          )
        );
      }

      if (action === "increment") {
        await prisma.$transaction(
          cart.map((item) =>
            prisma.donut.update({
              where: { id: item.id },
              data: {
                stock: { increment: item.quantity },
              },
            })
          )
        );
      }

      res.json({ message: "updated successfully" });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only put" });
  }
}
