import Image from "next/image";
import media_docena from "../../../public/images/media-docena.png"
import s from "./PromoCard.module.scss";

export default function PromoCard({
  id,
  fisrt_donuts,
  second_donuts,
  third_donuts,
  forth_donuts,
  price,
}) {
  return (
    <div className={s.promo}>
      <div className={s.id}>
        <p>{id}</p>
      </div>
      <div className={s.info}>
        <p>{fisrt_donuts}</p>
        <p>{second_donuts}</p>
        {third_donuts && <p>{third_donuts}</p>}
        {forth_donuts && <p>{forth_donuts}</p>}
        
      </div>
      <div className={s.image_container}>
        <Image 
          src={media_docena}
          width="120px"
          height="120px"
          objectFit="contain"
          />
          <p className={s.price}>${price}</p>
      </div>
    </div>
  );
}
