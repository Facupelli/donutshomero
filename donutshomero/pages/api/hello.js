import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const buy1 = await prisma.donutsPromoByUsers.findMany({})
  const buy2 = await prisma.donutsByUsers.findMany({})

  res.status(200).json({ donuts: buy2, donutsPromo: buy1 })
}
