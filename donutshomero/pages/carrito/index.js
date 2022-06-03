import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import CartItemPromo from "../../components/CartItem/CartItemPromo/CartItemPromo";
import CartItemSingle from "../../components/CartItem/CartItemSingle/CartItemSingle";
import s from "./index.module.scss";

export default function Carrito() {
  const cart = useSelector((state) => state.cart.cart);

  console.log("cart", cart);

  return (
    <div className={s.container}>
      <Nav route="carrito" />
      <div className={s.main}>
        <div className={s.titles}>
          <p>CARRITO</p>
          <p>TOTAL</p>
        </div>
        {cart.length > 0 &&
          cart.map((cartItem) =>
            cartItem.name ? (
              <CartItemSingle key={cartItem.id} cartItem={cartItem} />
            ) : (
              <CartItemPromo key={cartItem.id} cartItem={cartItem} />
            )
          )}
        <div className={s.total_container}>
          <p>TOTAL A PAGAR:</p>
          <p className={s.total}>
            ${cart.reduce((prev, acc, index, array) => {
              return prev + acc.price * acc.quantity;
            }, 0)}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
