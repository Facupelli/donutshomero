import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import CartItemPromo from "./CartItemPromo/CartItemPromo";
import CartItemSingle from "./CartItemSingle/CartItemSingle";
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
              <CartItemSingle cartItem={cartItem} />
            ) : (
              <CartItemPromo cartItem={cartItem} />
            )
          )}
      </div>
      <Footer />
    </div>
  );
}
