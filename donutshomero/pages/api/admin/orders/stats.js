import prisma from "../../../../lib/prisma";

export default async function getOrders(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.donut.findMany({
        select: {
          id: true,
          orders: true,
          quantity: true,
          name: true,
          _count: { select: { orders: true } },
          donutsPromo: {
            select: {
              donutQuantity: true,
              promo: {
                select: {
                  _count: { select: { orders: true } },
                  name: true,
                  donutsQuantity: true,
                },
              },
            },
          },
        },
      });

      // where: {
      //   createdAt: {
      //     gte: date === "all" ? undefined : `${date}T00:00:00.000Z`,
      //   },
      // },

      const donutsMostSold = data
      .map((donut) => {
        console.log()
        return {
          name: donut.name,
          totalSold: donut.orders.reduce((prev, acc) => {
            return prev + acc.items.filter((item) => item.id === donut.id)[0].quantity;
          }, 0),
        };
      })
      .sort((a, b) => b.totalSold - a.totalSold);

      const donutsMostSoldPlusPromo = data
        .map((donut) => {
          return {
            name: donut.name,
            totalSold:
              donut.donutsPromo.length > 0
                ? donut.donutsPromo.reduce((prev, acc) => {
                    return prev + acc.donutQuantity * acc.promo._count.orders;
                  }, 0) + donutsMostSold.filter(el => el.name === donut.name)[0].totalSold
                : donutsMostSold.filter(el => el.name === donut.name)[0].totalSold,
          };
        })
        .sort((a, b) => b.totalSold - a.totalSold);

      const promos = await prisma.promo.findMany({
        orderBy: { orders: { _count: "desc" } },
        select: {
          name: true,
          donutsQuantity: true,
          _count: { select: { orders: true } },
        },
      });

      const promosData = promos.map((promo) => ({
        name: `N°${promo.name} x ${promo.donutsQuantity}`,
        totalSold: promo._count.orders,
      }));

      const totalEarnings = await prisma.order.aggregate({
        _sum: {
          totalPrice: true,
        },
      });

      res.json({
        // data,
        withOutPromo: donutsMostSold,
        withPromo: donutsMostSoldPlusPromo,
        promos: promosData,
        totalEarnings,
      });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only get" });
  }
}
