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
import { decrementStock } from "../../../redux/features/donuts/donutsSlice";

import s from "./SingleDonutCard.module.scss";

export default function SingleDonutCard({ donut, delivery, cart }) {
  const { name, price, id } = donut;
  const dispatch = useDispatch();
  const single_donuts = useSelector((state) => state.donuts.single_donuts);

  const handleCartClick = () => {
    const stock = single_donuts.filter((item) => item.id === donut.id)[0].stock;
    if (stock <= 0) {
      console.log("NO HAY STOCK");
      return;
    }

    cart.filter((cartItem) => cartItem.id === id).length > 0
      ? dispatch(removeFromCart(id))
      : dispatch(addToCart(donut));

    dispatch(decrementStock({ id, qty: 1 }));
  };

  return (
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
  );
}
