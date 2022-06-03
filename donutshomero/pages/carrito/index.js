import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import CartItemPromo from "../../components/CartItem/CartItemPromo/CartItemPromo";
import CartItemSingle from "../../components/CartItem/CartItemSingle/CartItemSingle";
import s from "./index.module.scss";

export default function Carrito() {
  const cart = useSelector((state) => state.cart.cart);

  const orderedCart = [...cart]
    .sort((a, b) => {
      if (a.donuts) return 1;
      else return -1;
    })

  console.log("cart", orderedCart);

  return (
    <div className={s.container}>
      <Nav route="carrito" />
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
            <button>PAGAR</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
