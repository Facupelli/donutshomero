import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import media_docena from "../../../public/images/media-docena.png";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../../../redux/features/cart/cartSlice";
import {
  decrementStock,
  incrementStock,
} from "../../../redux/features/donuts/donutsSlice";

import s from "./PromoCard.module.scss";
import { handlePromoStock } from "../../../utils/handlePromoStock";
import { useState } from "react";

export default function PromoCard({ promo, delivery, cart, single_donuts }) {
  const dispatch = useDispatch();
  const { name, donutsPromo, price } = promo;
  const [stockMessage, setStockMessage] = useState("");

  const handleCartClick = () => {
    const qty = promo.donutsPromo.map((promo) => ({
      id: promo.donutId,
      qty: promo.donutQuantity,
    }));

    if (!handlePromoStock(qty, single_donuts, setStockMessage)) {
      return;
    }

    const isInCart = cart.filter((cartItem) => cartItem.id === promo.id);
    if (isInCart.length > 0) {
      //el producto ya esta en el carrito, lo elimino y devuelvo el stock
      dispatch(removeFromCart(promo.id));
      qty.map((el) => dispatch(incrementStock(el)));
    } else {
      //agrego el producto al carrito y decremento el stock
      dispatch(addToCart(promo));
      qty.map((el) => dispatch(decrementStock(el)));
    }
  };

  return (
    <>
      <div className={delivery ? s.promo_delivery : s.promo}>
        <div className={s.id}>
          <p>{name}</p>
        </div>
        <div className={s.info}>
          {donutsPromo &&
            donutsPromo.map((promo, i) => (
              <p key={i}>
                {promo.donutQuantity} {promo.donut.name}
              </p>
            ))}
        </div>
        <div className={s.image_container_pc}>
          <Image
            src={media_docena}
            width="120px"
            height="120px"
            objectFit="contain"
            alt="media_docena"
          />
          <p className={s.price}>${price}</p>
        </div>
        <div className={s.image_container_mobile}>
          <Image
            src={media_docena}
            width="80px"
            height="80px"
            objectFit="contain"
            alt="media_docena"
          />
          <p className={s.price}>${price}</p>
        </div>
        <div className={delivery ? s.cart_icon_container : s.none}>
          <FontAwesomeIcon
            icon={
              cart.filter((cartItem) => cartItem.id === promo.id).length > 0
                ? faBasketShopping
                : faCartPlus
            }
            className={s.cart_icon}
            onClick={handleCartClick}
          />
        </div>
      </div>
      {stockMessage && <p className={s.no_stock}>{stockMessage}</p>}
    </>
  );
}
