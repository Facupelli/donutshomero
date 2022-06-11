import axios from "axios";

export const getSingleDonuts = async (setState) => {
  const response = await axios.get(
    process.env.NODE_ENV === "production"
      ? "https://donutshomero.vercel.app/api/admin/donuts/singledonuts"
      : "http://localhost:3000/api/admin/donuts/singledonuts"
  );

  setState(response.data);
};

export const getOrders = async (setState, skip, take) => {
  const response = await axios.get(
    process.env.NODE_ENV === "production"
      ? `https://donutshomero.vercel.app/api/admin/orders?skip=${skip}&take=${take}`
      : `http://localhost:3000/api/admin/orders?skip=${skip}&take=${take}`
  );
  setState(response.data);
};
