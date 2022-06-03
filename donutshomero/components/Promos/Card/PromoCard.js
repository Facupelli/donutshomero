import Image from "next/image";
import media_docena from "../../../public/images/media-docena.png";
import s from "./PromoCard.module.scss";

export default function PromoCard({ title, donuts, price }) {
  return (
    <div className={s.promo}>
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
    </div>
  );
}
