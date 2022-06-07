export const updateDbStock = (cart) => {
  const promoDonuts = cart
    .filter((item) => item.donutsQuantity >= 6)
    //dejo la cantidad de promos y el objeto de la promo con su info
    .map((promo) => ({ promoQty: promo.quantity, promo: promo.donutsPromo }))
    //multiplico las donas por la cantidad de promo
    .map((el) => {
      return el.promo.map((donut) => ({
        ...donut,
        donutQuantity: donut.donutQuantity * el.promoQty,
      }));
    })
    .flat()
    //devuelvo solo el id y la cantidad de donas
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
