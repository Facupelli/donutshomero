import axios from "axios";

export default async function sendWsMessage(fullName, totalPrice, phoneNumber) {
  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "542647433662",
    type: "template",
    template: {
      name: "pedido_recibido",
      language: {
        code: "es_AR",
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: `${fullName}`,
            },
          ],
        },
      ],
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
