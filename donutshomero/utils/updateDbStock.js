export const updateDbStock = (cart) => {
  const promoDonuts = cart
    .filter((item) => item.donutsQuantity >= 6)
    .map((promo) => promo.donutsPromo)
    .flat()
    .map((donut) => ({
      id: donut.donutId,
      quantity: donut.donutQuantity,
    }));

  const singleDonuts = cart
    .filter((item) => item.name.length > 2)
    .map((donut) => ({
      id: donut.id,
      quantity: donut.quantity,
    }));

  const donutsBought = [...promoDonuts, ...singleDonuts];

  //elimino donas repetidas y sumo sus cantidades
  const boughtRecap = Object.entries(
    donutsBought.reduce((a, { id, quantity }) => {
      a[id] = (a[id] ?? 0) + quantity;
      return a;
    }, {})
  ).map(([id, quantity]) => ({ id, quantity }));

  const data = {
    cart: boughtRecap,
  };

  return data;
};
