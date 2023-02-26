import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ListApi } from "../../../api/LandingPage/listApi";
import { AddDonator } from "../AddDonator";

import Palm from "../../../images/palm.png";
import S from "./styles.module.scss";

interface Donation {
  _id: string
  title: string
  donator?: string
}

interface ShowFlyerResponse {
  _id: string
  manager: string
  text: string
  items?: Donation[]
}

export function ShowFlyer() {
  const [flyer, setFlyer] = useState<ShowFlyerResponse>();
  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    ListApi.getList(path)
      .then((res) => setFlyer(res.data))
      .catch((err) => console.log(err));
  }, [path])

  return (
    <div className={S.container}>
      <main className={S.content}>
        <header>
          <h1>Seja um benfeitor vicentino!</h1>
          <div>
            <p>&ldquo;O amor vem de Deus&rdquo; &#40;1 Jo 4,7&#41;</p>
            <div className={S.topPalms}>
              <img src={Palm} alt="folha de palmeira" />
              <img src={Palm} alt="folha de palmeira" />
            </div>
          </div>
        </header>
        <section className={S.section}><p>{flyer?.text}</p></section>
        <section className={S.section}>
          <h2>Alimentos</h2>
          <AddDonator />
          <div className={S.bottomPalms}>
            <img src={Palm} alt="folha de palmeira" />
            <img src={Palm} alt="folha de palmeira" />
          </div>
        </section>
      </main>
    </div>
  );
};