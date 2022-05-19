import s from "./Portrait.module.scss";
import portada from "../../public/images/portada.png";
import Image from "next/image";

export default function Portrait() {
  return (
    <div className={s.container}>
      <div className={s.image}>
        <Image
          src={portada}
          alt="Picture of the author"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
