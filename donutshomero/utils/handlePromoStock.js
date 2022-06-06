export const handlePromoStock = (qty, single_donuts, setStockMessage) => {
  const promoDonutsIds = qty.map((donut) => donut.id);

  const promoDonuts = single_donuts.filter((donut) =>
    promoDonutsIds.includes(donut.id)
  );
  //selecciono las donas singles que pertenecen a la promo

  let stock = true;

  promoDonuts.map((donut) => {
    const match = qty.filter((el) => el.id === donut.id);
    if (donut.stock - match[0].qty < 0) {
      console.log("NO HAY STOCK", donut.name);
      if (setStockMessage) {
        setStockMessage(
          `NO HAY STOCK :( | ${donut.name} STOCK: ${donut.stock}`
        );
      }
      stock = false;
    }
  });

  return stock;
};
