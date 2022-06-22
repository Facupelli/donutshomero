import prisma from "../../../../lib/prisma";

export default async function getOrders(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.order.findMany({
        select: {
          id: true,
          totalPrice: true,
          items: true,
          paymentMethod: true,
          singleDonuts: true,
          promoDonuts: {
            include: {
              donutsPromo: {
                include: { donut: true },
              },
            },
          },
        },
      });

      //SINGLE DONUTS
      const donutsMostSoldRecap = data
        .map((order) =>
          order.singleDonuts.map((donut) => {
            return {
              name: donut.name,
              totalSold: order.items.filter(
                (item) => item.name === donut.name
              )[0].quantity,
            };
          })
        )
        .flat();

      const donutsMostSold = Object.entries(
        donutsMostSoldRecap.reduce((a, { name, totalSold }) => {
          a[name] = (a[name] ?? 0) + totalSold;
          return a;
        }, {})
      )
        .map(([name, totalSold]) => ({ name, totalSold }))
        .sort((a, b) => b.totalSold - a.totalSold);

      // DONUTS IN PROMOS
      const donutsMostSoldInPromoRecap = data
        .map((order) =>
          order.promoDonuts.map((promo) =>
            promo.donutsPromo.map((donut) => {
              return {
                name: donut.donut.name,
                totalSold:
                  donut.donutQuantity *
                  order.items.filter((item) => item.id === donut.promoId)[0]
                    .quantity,
              };
            })
          )
        )
        .flat(2);

      const donutsMostSoldInPromo = Object.entries(
        donutsMostSoldInPromoRecap.reduce((a, { name, totalSold }) => {
          a[name] = (a[name] ?? 0) + totalSold;
          return a;
        }, {})
      )
        .map(([name, totalSold]) => ({ name, totalSold }))
        .sort((a, b) => b.totalSold - a.totalSold);
      //PROMOS MOST SOLD
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
        withOutPromo: donutsMostSold,
        withPromo: donutsMostSoldInPromo,
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
