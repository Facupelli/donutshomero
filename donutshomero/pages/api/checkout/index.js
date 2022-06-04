import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  // Crea un objeto de preferencia
  const cartItems = req.body;

  const items = cartItems.map((item) => {
    return {
      id: item.id,
      title: item.name ? item.name : item.title,
      quantity: Number(item.quantity),
      unit_price: Number(item.price),
    };
  });

  console.log('ITEMS', items)

  let preference = {
    items,
    // back_urls: {
    //   success: "https://www.success.com",
    //   failure: "http://www.failure.com",
    //   pending: "http://www.pending.com",
    // },
    // auto_return: "approved",
  };

  const response = await mercadopago.preferences.create(preference);

  res.json({
    id: response.body.id,
    init_point: response.body.init_point,
  });

  // mercadopago.preferences
  //   .create(preference)
  //   .then((res) => {
  //     res.json({
  //       id: response.body.id,
  //       init_point: response.body.init_point,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("MERCADOPAGO:", error);
  //   });
}
