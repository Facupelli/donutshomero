import Section from "../Section/Section";
import dynamic from "next/dynamic";
import local from "../../public/images/local.jpg";
import Image from "next/image";

import s from "./Local.module.scss";
import InfoCard from "./InfoCard/InfoCard";

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
      <InfoCard />
    </Section>
  );
}
