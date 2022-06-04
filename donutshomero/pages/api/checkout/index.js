import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.TESTMP_ACCESS_TOKEN,
  // access_token: process.env.MP_TOKEN_PRODUCTION,
});

export default async function handler(req, res) {
  // Crea un objeto de preferencia
  const { cart, customerData } = req.body;

  const items = cart.map((item) => {
    return {
      id: item.id,
      title: item.name ? item.name : item.title,
      quantity: Number(item.quantity),
      unit_price: Number(item.price),
    };
  });

  // console.log('ITEMS', items)

  let preference = {
    items,
    payer: {
      name: customerData.fullName.split(" ")[0],
      surname: customerData.fullName.split(" ")[1],
      email: customerData.email,
      phone: {
        area_code: "264",
        number: customerData.phone,
      },
      identification: {
        type: "DNI",
        number: "",
      },
      address: {
        street_name: customerData.address,
        street_number: Number(customerData.number),
        zip_code: "5400",
      },
    },
    back_urls: {
      success:
        process.env.NODE_ENV === "production"
          ? "https://donutshomero.vercel.app"
          : "http://localhost:3000/",
      // failure: "http://www.failure.com",
      // pending: "http://www.pending.com",
    },
    auto_return: "approved",
    payment_methods: {
      excluded_payment_types: [
        {
          id: "credit_card",
        },
        {
          id: "debit_card",
        },
        {
          id: "ticket",
        },
      ],

      installments: 12,
    },
  };

  const response = await mercadopago.preferences.create(preference);

  res.json({
    id: response.body.id,
    init_point: response.body.init_point,
  });

  // res.redirect(302, response.body.init_point);

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
