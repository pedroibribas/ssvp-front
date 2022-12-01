import { useState } from "react";
import { MdKeyboardReturn as ReturnIcon } from "react-icons/md";
import { Link } from "react-router-dom";

import { useList } from "../../hooks/useList";
import { AddDonationForm } from "./AddDonationForm";
import { DeleteListButton } from "./DeleteListButton";
import { DonationData } from "./DonationData";

export function ListPage() {
    const { list } = useList();

    const [isFormOpen, setIsFormOpen] = useState(false);

    const loadingComponent = <div
        className="text-center vh-100 mt-5"
    >
        <div className="spinner-border spinner-border-sm" />
        <small className="ms-1">Carregando lista...</small>
    </div>

    function handleClick() {
        setIsFormOpen(!isFormOpen);
    };

    if (!list) {
        return loadingComponent;
    }

    return (
        <main className="container">
            <section>
                <h1 className="display-1 py-4 text-center">
                    Painel de alterações
                </h1>
            </section>

            <section>
                <h2 className="display-5">Dados do panfleto</h2>

                <dl>
                    <div className="row">
                        <dt className="col-auto">Responsável</dt>
                        <dd className="col-auto">{list?.manager}</dd>
                    </div>
                    <div className="row">
                        <dt className="col-auto">Descrição</dt>
                        <dd className="col-auto text-muted">/*em construção*/</dd>
                    </div>
                </dl>

                <hr />
                <div className="text-center">
                    <Link to={`/flyer/${list?.id}`} target="_blank" className="btn btn-warning">
                        Ver panfleto
                    </Link>
                </div>

                <hr />
                <div>
                    <>
                        <h3>Doações</h3>
                        {list?.items.map((item, index) => (
                            <DonationData
                                key={item.id}
                                item={item}
                                index={index}
                            />
                        ))}
                        <button
                            className="btn btn-primary"
                            onClick={handleClick}
                        >
                            Adicionar doação
                        </button>
                        {isFormOpen && (
                            <div className="mt-3 p-3 bg-dark rounded">
                                <AddDonationForm />
                            </div>
                        )}
                    </>
                </div>

                <hr />
                <div>
                    <h3>Texto de apresentação</h3>
                    {/* TODO Criar campo para ler o texto do panfleto */}
                    <p className="p-3 bg-light font-monospace text-start lh-lg">
                        A Sociedade São Vicente de Paulo é uma organização de leigos da Igreja Católica, dedicada ao trabalho cristão de Caridade aos mais desfavorecidos.
                        <br />
                        Foi criada na França em 1833 pelo Beato Antônio Frederico Ozanam e seus amigos universitários, espalhando-se rapidamente pelo mundo. Atualmente a Sociedade já está presente em 150 países.
                        <br />
                        Seu trabalho caritativo tem o objetivo de aliviar o sofrimento das pessoas mais vulneráveis, auxiliando-as de maneira assistencial e espiritual a fim de promovê-las socialmente, recuperando sua dignidade e adquirindo sua própria independência.
                        <br />
                        Nosso grupo Vicentino reúne-se semanalmente na capela São Vicente de Paulo no bairro Jardim Alvorada, Três Lagoas- MS e está precisando montar cestas básicas para doação às famílias carentes que assistimos.
                        <br />
                        Caso você possa nos ajudar mensalmente com algum tipo de alimento desses que elencamos a seguir, poderemos fortalecer o nosso trabalho e possivelmente ampliá-lo para a assistência a mais famílias!
                    </p>
                </div>
            </section>

            <hr />
            <section className="py-5 text-center ">
                <DeleteListButton />
            </section>

            <hr />
            <section className="py-4 text-center ">
                <Link className="link-dark" to="/dashboard">
                    Voltar para todas as listas
                    <ReturnIcon className="d-block mx-auto" />
                </Link>
            </section>
        </main>
    );
};