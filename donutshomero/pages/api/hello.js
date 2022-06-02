import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const feed = await prisma.donutsBuyedByUsers.findMany({})
  res.status(200).json({ name: feed })
}
