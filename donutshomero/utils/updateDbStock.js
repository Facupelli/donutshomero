export const updateDbStock = (cart) => {
  const rellenas = [
    "cl40ncyij0039isuwsg8es48m",
    "cl40ncyik0041isuw2zpgilga",
    "cl40ncyik0051isuwl707iv9s",
  ];

  const promoDonuts = cart
    .filter((item) => item.donutsQuantity >= 6)
    //si viene la promo de eleccion dejo solo las donas por defectos y saco las elegidas
    //dejo la cantidad de promos y el objeto de la promo con su info
    .map((promo) => {
      if (promo.id === "cl41rwcbi0205gcuwzxa71511") {
        return {
          promoQty: promo.quantity,
          promo: promo.donutsPromo.filter(
            (el) => !rellenas.includes(el.donutId)
          ),
        };
      }
      return { promoQty: promo.quantity, promo: promo.donutsPromo };
    })
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

  //manejo de las donas elegidas
  const donutsChosen = cart
    .filter((item) => item.id === "cl41rwcbi0205gcuwzxa71511")
    .map((promo) => ({
      promo: promo.donutsPromo.filter((el) => rellenas.includes(el.donutId)),
    }))
    .map((el) => el.promo)
    .flat()
    .map((el) => ({ id: el.donutId, quantity: el.donutQuantity }));

  const singleDonuts = cart
    .filter((item) => item.name.length > 2)
    .map((donut) => ({
      id: donut.id,
      quantity: donut.quantity,
    }));

  const donutsBought = [...promoDonuts, ...singleDonuts, ...donutsChosen];

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
