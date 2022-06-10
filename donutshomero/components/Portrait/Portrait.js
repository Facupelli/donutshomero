import portada from "../../public/images/portada.png";
import portada_phone from "../../public/images/portada_phone.png";
import Image from "next/image";
import { useRouter } from "next/router";

import s from "./Portrait.module.scss";

export default function Portrait() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/delivery");
  };

  return (
    <div className={s.container}>
      <div className={s.image}>
        <Image
          src={portada}
          alt="Picture of the author"
          objectFit="cover"
          height="1110px"
          width="1920px"
          priority
        />
      </div>
      <div className={s.image_phone}>
        <Image
          src={portada_phone}
          alt="Picture of the author"
          objectFit="cover"
          height="1512px"
          width="1080px"
          priority
        />
      </div>
      <div
        aria-label="deilvery"
        className={s.delivery_btn_container}
        onClick={handleClick}
      >
        <button>PEDÍ ACÁ TUS DONAS!</button>
      </div>
    </div>
  );
}
