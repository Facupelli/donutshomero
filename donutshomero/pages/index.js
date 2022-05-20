import Head from "next/head";
import Portrait from "../components/Portrait/Portrait";
import Nav from "../components/Nav/Nav";
import Promos from "../components/Promos/Promos";
import Menu from "../components/Menu/Menu";
import Local from '../components/Local/Local'

import s from "../styles/index.module.scss";
import { useRef } from "react";

export default function Home() {

  const menuDivRef = useRef(null);
  const localDivRef = useRef(null);

  return (
    <div>
      <Head>
        <title>Donuts Homer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Nav menuDivRef={menuDivRef} localDivRef={localDivRef} />
        <div className={s.portrait}>
          <Portrait />
        </div>
        <div className={s.promos}>
          <Promos />
          <Menu menuDivRef={menuDivRef} />
          <Local localDivRef={localDivRef} />
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
