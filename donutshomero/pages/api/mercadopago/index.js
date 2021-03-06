import mercadopago from "mercadopago";
import prisma from "../../../lib/prisma";
import axios from "axios";
import sendWsMessage from "../../../utils/whatsapp";

mercadopago.configure({
  access_token: process.env.TESTMP_ACCESS_TOKEN,
  // access_token: process.env.MP_TOKEN_PRODUCTION,
});

export default async function mercadopagoController(req, res) {
  // Crea un objeto de preferencia
  if (req.method === "POST") {
    try {
      if (req.query.type === "payment") {
        const paymentId = req.body.data.id; // ID de payment en MercadoPago

        const payment = await axios.get(
          `https://api.mercadopago.com/v1/payments/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TESTMP_ACCESS_TOKEN}`,
            },
          }
        );

        const orderId = payment.data.external_reference;

        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: { customer: true },
        });

        if (order.totalPrice === payment.data.transaction_amount) {
          const status = payment.data.status.toUpperCase();
          await prisma.order.update({
            where: {
              id: orderId,
            },
            data: {
              paymentStatus: status, //APPROVED
            },
          });
        }

        if (payment.data.status.toUpperCase() === "APPROVED") {
          sendWsMessage(
            `${order.customer.name} ${order.customer.surname}`,
            order.totalPrice
          );
        }
      }
      res.send(200);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only post" });
  }
}
