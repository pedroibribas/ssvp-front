import { Link } from "react-router-dom";
import { Footer } from "../../../components/Dashboard/Footer";
import { Header } from "../../../components/Dashboard/Header";
import { ShowFlyers } from "../../../components/Dashboard/ShowFlyers";

export const Flyers = () => (
  <>
    <Header />
    <main className="container">
      <h1 className="pt-4">Panfletos do usuário</h1>
      <hr />
      <Link to="/dashboard/flyers/create" className="btn btn-primary">Criar panfleto</Link>
      <hr />
      <div className="mt-5"><ShowFlyers /></div>
    </main>
    <Footer />
  </>
)