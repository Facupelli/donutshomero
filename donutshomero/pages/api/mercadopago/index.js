import mercadopago from "mercadopago";
import prisma from "../../../lib/prisma";

mercadopago.configure({
  access_token: process.env.TESTMP_ACCESS_TOKEN,
  // access_token: process.env.MP_TOKEN_PRODUCTION,
});

export default async function handler(req, res) {
  // Crea un objeto de preferencia
  if (req.method === "POST") {
    console.log(req);
    try {
      if (req.params.type === "payment") {
        const paymentId = req.params.data.id; // ID de payment en MercadoPago

        const payment = await mercadopago.payments.get(paymentId);
        // Obtenemos los datos del pago desde MP
        const orderId = payment.external_reference;

        const order = await prisma.order.findUnique({ where: { id: orderId } });

        if (order.totalPrice === payment.transaction_amount) {
          await prisma.order.update({
            where: {
              id: orderId,
            },
            data: {
              status: payment.satus, //APPROVED
            },
          });
        }
      }
    } catch (err) {
      res.status(400).json({ error: err });
    }
  } else {
    res.status(500).json({ error: "only post" });
  }
}
