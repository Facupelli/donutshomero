import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import single_donut from "../../../public/images/single_donut.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../../../redux/features/cart/cartSlice";
import {
  decrementStock,
  incrementStock,
} from "../../../redux/features/donuts/donutsSlice";

import s from "./SingleDonutCard.module.scss";

export default function SingleDonutCard({ donut, delivery, cart }) {
  const dispatch = useDispatch();
  const { name, price, id } = donut;
  const single_donuts = useSelector((state) => state.donuts.single_donuts);
  const [stockState, setStockState] = useState("");

  const handleCartClick = () => {
    const isInCart = cart.filter((cartItem) => cartItem.id === id);
    if (isInCart.length > 0) {
      //el producto ya esta en el carrito, lo elimino y devuelvo el stock
      dispatch(removeFromCart(id));
      dispatch(incrementStock({ id, qty: 1 }));
    } else {
      //controlo stock
      const stock = single_donuts.filter((item) => item.id === donut.id)[0]
        .stock;
      if (stock <= 0) {
        console.log("NO HAY STOCK");
        setStockState(`NO HAY STOCK DE: ${donut.name} :(`);
        return;
      }
      //agrego el producto al carrito y decremento el stock
      setStockState("");
      dispatch(addToCart(donut));
      dispatch(decrementStock({ id, qty: 1 }));
    }
  };

  return (
    <>
      <div className={delivery ? s.single_donut_cart : s.single_donut}>
        <p className={s.donut_name}>{name.toUpperCase()}</p>
        <p className={s.price}>${price}</p>
        <div className={s.image_container}>
          <Image
            src={single_donut}
            width="65px"
            height="65px"
            objectFit="contain"
            alt="single_donut_2"
          />
        </div>
        <div className={s.image_container_phone}>
          <Image
            src={single_donut}
            width="45px"
            height="45px"
            objectFit="contain"
            alt="single_donut_phone"
          />
        </div>
        <div className={delivery ? s.cart_icon_container : s.none}>
          <FontAwesomeIcon
            icon={
              cart.filter((cartItem) => cartItem.id === donut.id).length > 0
                ? faBasketShopping
                : faCartPlus
            }
            className={s.cart_icon}
            onClick={handleCartClick}
          />
        </div>
      </div>
      {stockState && <p className={s.no_stock}>{stockState}</p>}
    </>
  );
}
