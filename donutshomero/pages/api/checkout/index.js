import mercadopago from "mercadopago";
import prisma from "../../../lib/prisma";

mercadopago.configure({
  access_token: process.env.TESTMP_ACCESS_TOKEN,
  // access_token: process.env.MP_TOKEN_PRODUCTION,
});

export default async function checkout(req, res) {
  // Crea un objeto de preferencia
  if (req.method === "POST") {
    try {
      const { cart, customerData, totalPrice } = req.body;

      let user;

      const userExist = await prisma.user.findFirst({
        where: {
          phone: String(customerData.phone),
          name: customerData.fullName.split(" ")[0],
        },
      });

      if (userExist) {
        user = userExist;
      }
      if (!userExist) {
        user = await prisma.user.create({
          data: {
            name: customerData.fullName.split(" ")[0],
            surname: customerData.fullName.split(" ")[1],
            phone: String(customerData.phone),
            address: customerData.address,
            addressNumber: Number(customerData.number),
            ubiLink: customerData.addressLink,
          },
        });
      }

      const order = await prisma.order.create({
        data: {
          items: cart,
          customer: {
            connect: { id: user.id },
          },
          paymentStatus: "PENDING",
          deliverStatus: "PENDING",
          totalPrice,
          paymentMethod: customerData.paymentMethod,
        },
        include: {
          customer: true, // Include all posts in the returned object
        },
      });

      const items = cart.map((item) => {
        return {
          id: item.id,
          title: item.name ? item.name : item.title,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
        };
      });

      let preference = {
        external_reference: order.id,
        notification_url: "https://donutshomero.vercel.app/api/mercadopago",
        items,
        payer: {
          name: user.name,
          surname: user.surname,
          phone: {
            area_code: "264",
            number: Number(user.phone),
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
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    console.log("only post");
    res.status(500).json({ error: "only post" });
  }
}
