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
        <p>CARRITO</p>
        {cart.length > 0 &&
          cart.map((cartItem) =>
            cartItem.name ? (
              <CartItemSingle key={cartItem.id} cartItem={cartItem} />
            ) : (
              <CartItemPromo key={cartItem.id} cartItem={cartItem} />
            )
          )}
      </div>
      <Footer />
    </div>
  );
}
