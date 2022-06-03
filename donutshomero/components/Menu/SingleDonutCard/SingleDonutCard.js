import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import single_donut from "../../../public/images/single_donut.png";

import s from "./SingleDonutCard.module.scss";
import { useState } from "react";

export default function SingleDonutCard({ donut, price, delivery }) {
  return (
    <div className={delivery ? s.single_donut_cart : s.single_donut}>
      <p className={s.donut_name}>{donut.toUpperCase()}</p>
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
        <FontAwesomeIcon icon={faCartPlus} className={s.cart_icon} />
      </div>
    </div>
  );
}
