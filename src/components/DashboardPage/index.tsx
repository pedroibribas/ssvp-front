import { useState } from "react";
import { CreateListForm } from "./CreateListForm";
import { ListsDisplay } from "./ListsDisplay";

export function DashboardPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    function handleClick() {
        setIsFormOpen(!isFormOpen);
    };

    return (
        <main className="container">
            <section>
                <h1 className="display-1 py-4">
                    Início
                </h1>
            </section>
            <section>
                <h2 className="display-5">
                    Panfletos do usuário
                </h2>
                <hr />
                <button
                    className="d-block mx-auto btn btn-primary"
                    type="button"
                    onClick={handleClick}
                >
                    Criar panfleto
                </button>
                {isFormOpen && (
                    <div className="mt-3 p-3 rounded bg-secondary">
                        <CreateListForm />
                    </div>
                )}
            </section>
            <section>
                <div className="mt-5">
                    <ListsDisplay />
                </div>
            </section>
        </main>
    );
};