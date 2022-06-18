import axios from "axios";

export default async function sendWsMessage(fullName, orderInfo, phoneNumber) {
  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "542647433662",
    type: "template",
    template: {
      name: "pedido_recibido",
      language: {
        code: "es",
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: `${fullName}`,
            },
            {
              type: "text",
              text: `${orderInfo}`,
            },
          ],
        },
      ],
    },
  };

  let wsRes;

  try {
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
    console.log("ERROR", err.response?.data?.error);
    return { error: "mensaje no enviado" };
  }
}
