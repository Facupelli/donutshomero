import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import CartItemPromo from "../../components/CartItem/CartItemPromo/CartItemPromo";
import CartItemSingle from "../../components/CartItem/CartItemSingle/CartItemSingle";
import { useState } from "react";

import s from "./index.module.scss";
import PurchaseForm from "../../components/PurchaseForm/PurchaseForm";



export default function Carrito() {
  const [customerData, setCustomerData] = useState(false);
  const cart = useSelector((state) => state.cart.cart);

  const orderedCart = [...cart].sort((a, b) => a.price - b.price);

  const handleClickPagar = () => {
    if (cart.length > 0) setCustomerData(true);
  };

  console.log("cart", orderedCart);

  return (
    <div className={s.container}>
      <Nav route="carrito" />
      {!customerData && (
        <div className={s.main}>
          <div className={s.titles}>
            <p>CARRITO</p>
            <p>TOTAL</p>
          </div>
          {cart.length > 0 &&
            orderedCart.map((cartItem) =>
              cartItem.name ? (
                <CartItemSingle key={cartItem.id} cartItem={cartItem} />
              ) : (
                <CartItemPromo key={cartItem.id} cartItem={cartItem} />
              )
            )}
          {cart.length <= 0 && (
            <p className={s.cart_empty}>
              Agregue productos a su carrito en Delivery!
            </p>
          )}
          <div className={s.total_container}>
            <p>TOTAL A PAGAR:</p>
            <p className={s.total}>
              $
              {cart.reduce((prev, acc, index, array) => {
                return prev + acc.price * acc.quantity;
              }, 0)}
            </p>
            <div className={s.pagar_btn_container}>
              <button onClick={handleClickPagar}>PAGAR</button>
            </div>
          </div>
        </div>
      )}

      {customerData && <PurchaseForm />}
      <Footer />
    </div>
  );
}
