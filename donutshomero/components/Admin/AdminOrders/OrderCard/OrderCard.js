import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SwitchButton from "../../../SwitchButton/SwitchButton";

import s from "./OrderCard.module.scss";

export default function OrderCard({ order }) {
  const [showItems, setShowItems] = useState(true);
  const [delivered, setDelivered] = useState(
    order.deliverStatus === "PENDING" ? false : true
  );
  const [paid, setPaid] = useState(
    order.paymentStatus === "PENDING" ? false : true
  );
  const [loading, setLoading] = useState(false);
  const [payBtnLoading, setPayBtnLoading] = useState(false);

  const handleDelivered = async () => {
    setDelivered(!delivered);
    try {
      setLoading(true);
      const data = { id: order.id, deilverStatus: !delivered };
      const res = await axios.put(
        process.env.NODE_ENV === "production"
          ? "https://donutshomero.vercel.app/api/admin/deliverstatus"
          : "http://localhost:3000/api/admin/deliverstatus",
        data
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handlePaid = async () => {
    setPaid(!paid);
    try {
      setPayBtnLoading(true);
      const data = { id: order.id, paymentStatus: !paid };
      const res = await axios.put(
        process.env.NODE_ENV === "production"
          ? "https://donutshomero.vercel.app/api/admin/paymentstatus"
          : "http://localhost:3000/api/admin/paymentstatus",
        data
      );
      setPayBtnLoading(false);
    } catch (err) {
      console.log(err);
      setPayBtnLoading(false);
    }
  };

  const choosePromo = order.items.filter(
    (item) => item.id === "cl41rwcbi0205gcuwzxa71511"
  )[0];

  console.log(choosePromo);

  return (
    <div className={s.container}>
      <div className={s.orders_card_container}>
        <p className={s.id}>{order.number}</p>
        <div>
          <p className={s.total_price}>
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
              maximumSignificantDigits: 12,
            }).format(order.totalPrice)}
          </p>
          <div className={s.child_padding}>
            <p>{order.address}</p>
            <p>{order.addressNumber}</p>
          </div>
          <p className={s.child_padding}>
            {order.ubiLink ? order.ubiLink : "-"}
          </p>
          <p>{order.paymentMethod}</p>
          {/* -------------------  MOBILE -------------------------- */}
          <div className={s.info_mobile}>
            <p className={s.title_mobile}>ESTADO PAGO:</p>
            <p
              className={
                order.paymentStatus === "APPROVED" ? s.approved : s.pending
              }
            >
              {order.paymentStatus}
              {order.paymentMethod === "efectivo" ? (
                <SwitchButton
                  id={order.id}
                  loading={payBtnLoading}
                  isOn={paid}
                  handleToggle={handlePaid}
                  payment
                />
              ) : null}
            </p>
            <p className={s.title_mobile}>ESTADO ENTREGA:</p>
            <p
              className={
                order.deliverStatus === "DELIVERED" ? s.approved : s.pending
              }
            >
              {order.deliverStatus}
              <SwitchButton
                id={order.id}
                loading={loading}
                isOn={delivered}
                handleToggle={handleDelivered}
              />
            </p>
            <p className={s.title_mobile}>CELULAR:</p>
            <div className={s.phone}>
              <p>{order.customer.phone}</p>
            </div>
          </div>
          {/* ------------------ PC --------------------------- */}
          <div className={s.info_pc}>
            <p
              className={
                order.paymentStatus === "APPROVED" ? s.approved : s.pending
              }
            >
              {order.paymentStatus}
              {order.paymentMethod === "efectivo" ? (
                <SwitchButton
                  id={order.id}
                  loading={payBtnLoading}
                  isOn={paid}
                  handleToggle={handlePaid}
                  payment
                />
              ) : null}
            </p>
            <p
              className={
                order.deliverStatus === "DELIVERED" ? s.approved : s.pending
              }
            >
              {order.deliverStatus}
              <SwitchButton
                id={order.id}
                loading={loading}
                isOn={delivered}
                handleToggle={handleDelivered}
              />
            </p>
            <div className={s.phone}>
              <p>{order.customer.phone}</p>
            </div>
          </div>
          <FontAwesomeIcon
            icon={showItems ? faAngleUp : faAngleDown}
            className={s.angle_icon}
            onClick={() => setShowItems(!showItems)}
          />
        </div>
      </div>
      {showItems && (
        <div className={s.show_donuts_container}>
          <div>
            {order.items.map((item, i) => (
              <div key={i} className={s.show_donuts}>
                <p className={s.donut_name}>
                  {item.donutsQuantity
                    ? `Promo N° ${item.name} - ${item.donutsQuantity} Donas`
                    : item.name}
                </p>
                <p className={s.qty}>x{item.quantity}</p>
              </div>
            ))}
            {choosePromo ? (
              <div className={s.choosed_donuts}>
                <p>ELEGIDAS:</p>
                <div>
                  {choosePromo.donutsPromo
                    .filter((donut) => !donut.promoId)
                    .map((dona) => (
                      <p>
                        {dona.donutName} <span>x{dona.donutQuantity}</span>
                      </p>
                    ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className={s.order_date}>
            <p>FECHA:</p>
            <div className={s.date}>
              <p>
                {new Date(order.createdAt)
                  .toDateString()
                  .split(" ")
                  .slice(1, 3)
                  .join(" ")}
              </p>
              <p>
                {new Date(order.createdAt)
                  .toLocaleTimeString()
                  .split(":")
                  .slice(0, 2)
                  .join(":")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
