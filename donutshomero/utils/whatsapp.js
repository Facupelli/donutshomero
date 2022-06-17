import axios from "axios";

export default async function sendWsMessage(fullName, totalPrice, phoneNumber) {
  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "542647433662",
    type: "text",
    text: {
      preview_url: false,
      body: `Donuts Homero, hola ${fullName} gracias por tu compra! Estamos preparando el pedido en breve sale el delivery! Cuando llegue el total a pagar es $${totalPrice} + delivery.`,
    },
  };

  let wsRes;

  try {
    console.log("llego");
    wsRes = await axios.post(
      `https://graph.facebook.com/v13.0/${process.env.WS_NUMBER_ID}/messages`,
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.WS_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return wsRes.data;
  } catch (err) {
    console.log("ERROR", err);
    return { error: "mensaje no enviado" };
  }
}
