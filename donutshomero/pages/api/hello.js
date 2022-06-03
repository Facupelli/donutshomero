import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const donut = await prisma.donut.findMany({})

  res.status(200).json({ donut })
}
