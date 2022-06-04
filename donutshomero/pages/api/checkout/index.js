import mercadopago from "mercadopago";
import prisma from "../../../lib/prisma";

mercadopago.configure({
  access_token: process.env.TESTMP_ACCESS_TOKEN,
  // access_token: process.env.MP_TOKEN_PRODUCTION,
});

export default async function handler(req, res) {
  // Crea un objeto de preferencia
  if (req.method === "POST") {
    try {
      const { cart, customerData } = req.body;

      console.log("customerData", customerData.phone);

      const user = await prisma.user.create({
        data: {
          name: customerData.fullName.split(" ")[0],
          surname: customerData.fullName.split(" ")[1],
          phone: Number(customerData.phone),
          address: customerData.address,
          addressNumber: Number(customerData.number),
          ubiLink: customerData.addressLink,
        },
      });

      // console.log("USER", user);

      // console.log('CART', cart)

      const order = await prisma.order.create({
        data: {
          items: cart,
          customer: {
            connect: {id: user.id}
          },
          paymentMethod: customerData.paymentMethod,
        },
        include: {
          customer: true, // Include all posts in the returned object
        },
      });

      // console.log("ORDERS", order);

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
          name: user.name,
          surname: user.surname,
          phone: {
            area_code: "264",
            number: user.phone,
          },
          identification: {
            type: "DNI",
            number: "",
          },
          address: {
            street_name: user.address,
            street_number: Number(user.addressNumber),
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
            // {
            //   id: "credit_card",
            // },
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
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only post" });
  }
}
