import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import media_docena from "../../../public/images/media-docena.png";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice";

import s from "./PromoCard.module.scss";

export default function PromoCard({ promo, delivery }) {
  const { title, donuts, price } = promo;
  const dispatch = useDispatch()

  return (
    <div className={delivery ? s.promo_delivery : s.promo}>
      <div className={s.id}>
        <p>{title}</p>
      </div>
      <div className={s.info}>
        {donuts && donuts.map((donut) => <p key={donut}>{donut}</p>)}
      </div>
      <div className={s.image_container}>
        <Image
          src={media_docena}
          width="120px"
          height="120px"
          objectFit="contain"
          alt="media_docena"
        />
        <p className={s.price}>${price}</p>
      </div>
      <div className={delivery ? s.cart_icon_container : s.none}>
        <FontAwesomeIcon
          icon={faCartPlus}
          className={s.cart_icon}
          onClick={() => dispatch(addToCart(promo))}
        />
      </div>
    </div>
  );
}
