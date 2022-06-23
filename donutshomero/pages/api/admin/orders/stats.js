import prisma from "../../../../lib/prisma";

export default async function getOrders(req, res) {
  if (req.method === "GET") {
    try {
      const { date } = req.query;

      const data = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: date === "all" ? undefined : `${date}T00:00:00.000Z`,
          },
        },
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

      const ordersByPayment = [
        {
          name: "efectivo",
          totalSold: data.filter((order) => order.paymentMethod === "efectivo")
            .length,
        },
        {
          name: "mercadopago",
          totalSold: data.filter(
            (order) => order.paymentMethod === "mercadopago"
          ).length,
        },
      ].sort((a, b) => b.totalSold - a.totalSold);

      //PROMOS MOST SOLD
      const promos = await prisma.promo.findMany({
        orderBy: { orders: { _count: "desc" } },
        select: {
          name: true,
          donutsQuantity: true,
          orders: {
            where: {
              createdAt: {
                gte: date === "all" ? undefined : `${date}T00:00:00.000Z`,
              },
            },
          },
          _count: { select: { orders: true } },
        },
      });

      const promosData = promos.map((promo) => ({
        name: `N°${promo.name} x ${promo.donutsQuantity}`,
        totalSold: promo.orders.length,
      }));

      const totalEarnings = await prisma.order.aggregate({
        where: {
          createdAt: {
            gte: date === "all" ? undefined : `${date}T00:00:00.000Z`,
          },
        },
        _sum: {
          totalPrice: true,
        },
      });

      res.json({
        withOutPromo: donutsMostSold,
        withPromo: donutsMostSoldInPromo,
        promos: promosData,
        payment: ordersByPayment,
        totalEarnings,
      });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only get" });
  }
}
