import { AddDonatorForm } from "../../components/AddDonatorForm";
import Palm from "../../images/palm.png";
import S from "./styles.module.scss";

export function Flyer() {
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
        <section className={S.section}>
          <p>
            A Sociedade São Vicente de Paulo é uma organização de leigos da Igreja Católica, dedicada ao trabalho cristão de caridade aos mais desfavorecidos.
          </p>
          <p>
            Foi criada na França em 1833 por um grupo de jovens universitários e rapidamente a Sociedade espalhou-se pelo mundo, já estando presente em 150 países.
          </p>
          <p>
            Seu trabalho caritativo tem o objetivo de aliviar o sofrimento das pessoas mais vulneráveis, auxiliando-as de maneira assistencial e espiritual a fim de erguê-las socialmente, recuperando sua dignidade e adquirindo sua própria independência.
          </p>
          <p>
            Nosso grupo Vicentino reúne-se semanalmente na capela São Vicente de Paulo no bairro Jardim Alvorada, Três Lagoas-MS, e está precisando montar cestas básicas para doação às famílias carentes que assistimos.
          </p>
          <p>
            Caso você possa nos ajudar mensalmente com algum tipo de alimento desses que elencamos a seguir, poderemos continuar com nosso trabalho e possivelmente ampliá-lo para a assistência a mais famílias!
          </p>
        </section>
        <section className={S.section}>
          <h2>Alimentos</h2>
          <AddDonatorForm />
          <div className={S.bottomPalms}>
            <img src={Palm} alt="folha de palmeira" />
            <img src={Palm} alt="folha de palmeira" />
          </div>
        </section>
      </main>
    </div>
  );
};