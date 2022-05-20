import Section from "../Section/Section";
import dynamic from "next/dynamic";
import local from "../../public/images/local.jpg";
import Image from "next/image";
import single_donut from "../../public/images/single_donut.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faTruckFast,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import s from "./Local.module.scss";

export default function Local({ localDivRef }) {
  const Map = dynamic(() => import("./Map/Map"), {
    loading: () => <p>Map Loading...</p>,
    ssr: false,
  });

  return (
    <Section title="LOCAL">
      {/* mapa - lugar - fotos */}
      <div className={s.container} ref={localDivRef}>
        <div className={s.image_container}>
          <Image
            src={local}
            height="250px"
            width="490px"
            objectFit="cover"
            style={{ borderRadius: ".5rem" }}
            alt="local"
          />
        </div>
        <Map />
      </div>
      <div className={s.info}>
        <div className={s.ubi}>
          <p className={s.departament}>CAPITAL</p>
          <p className={s.address}>
            <FontAwesomeIcon
              icon={faLocationDot}
              width="15px"
              color="#0081b7"
            />
            CALLE JUJUY N 4234, ENTRE LAPRIDA Y LIBERTADOR
          </p>
        </div>
        <div className={s.ubi}>
          <div className={s.horario}>
            <p className={s.bold}>
              <FontAwesomeIcon icon={faClock} width="15px" color="#0081b7" />
              Horario
            </p>
            <p className={s.dias}>Luneas a Domingo: 7 AM a 9 PM.</p>
          </div>
          <div className={s.horario}>
            <p className={s.bold}>
              <FontAwesomeIcon
                icon={faTruckFast}
                width="15px"
                color="#0081b7"
              />
              Delivery
            </p>
            <p className={s.dias}>Luneas a Domingo: 12 AM a 8 PM.</p>
          </div>
          <div className={s.horario}>
            <p>
              <FontAwesomeIcon icon={faPhone} width="15px" color="#0081b7" />
              <span>Telf:</span> 264-5467990
            </p>
          </div>
        </div>
        <div className={s.single_donut_container}>
          <Image src={single_donut} width="80px" height="80px" alt="single_donut" />
        </div>
      </div>
    </Section>
  );
}
