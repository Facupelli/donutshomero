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
      if (req.query.type === "payment") {
        const paymentId = req.body.data.id; // ID de payment en MercadoPago

        console.log("PAYMENT ID", paymentId);
        const payment = await axios.get(
          `https://api.mercadopago.com/v1/payments/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TESTMP_ACCESS_TOKEN}`,
            },
          }
        );

        // Obtenemos los datos del pago desde MP

        const orderId = payment.data.external_reference;

        console.log("ORDER ID", orderId);

        const order = await prisma.order.findUnique({ where: { id: orderId } });

        console.log("ORDER", order);

        if (order.totalPrice === payment.data.transaction_amount) {
          await prisma.order.update({
            where: {
              id: orderId,
            },
            data: {
              status: payment.data.satus.toUpperCase(), //APPROVED
            },
          });
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
