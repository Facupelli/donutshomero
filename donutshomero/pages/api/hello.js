import axios from "axios";
import mercadopago from "mercadopago";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  res.status(200).json({ hello: "hello" });
}
