import Section from "../Section/Section";
import dynamic from "next/dynamic";
import local from "../../public/images/local.jpg";

import s from "./Local.module.scss";
import Image from "next/image";

export default function Local() {
  const Map = dynamic(() => import("./Map/Map"), {
    loading: () => <p>Map Loading...</p>,
    ssr: false,
  });

  return (
    <Section title="LOCAL">
      {/* mapa - lugar - fotos */}
      <div className={s.container}>
        <div className={s.image_container}>
          <Image src={local} height="350px" width="490px" objectFit="cover" style={{borderRadius: ".5rem"}} />
        </div>
        <Map />
      </div>
    </Section>
  );
}
