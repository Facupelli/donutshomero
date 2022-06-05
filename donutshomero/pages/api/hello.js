import axios from "axios";
import mercadopago from "mercadopago";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const payment = await axios.get(
    `https://api.mercadopago.com/v1/payments/22913953174`,
    {
      headers: {
        Authorization:
          `Bearer ${process.env.TESTMP_ACCESS_TOKEN}`,
      },
    }
  );

  // Obtenemos los datos del pago desde MP
  console.log("PAYMENT ", payment.data , payment.data.transaction_amount);

  const orderId = payment.external_reference;

  // const order = await prisma.order.findUnique({ where: { id: orderId } });

  // console.log("PAYMENT", payment, "status", payment.status)
  // console.log("ORDER", order)

  res.status(200).json({ hello: "hello" });
}
