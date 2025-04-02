import React from "react";
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Turmas from "./pages/Turmas/Turmas.js";
import Financeiro from "./pages/Financeiro/Financeiro.js";
import DadosDosAlunos from "./pages/DadosDosAlunos/DadosDosAlunos.js";
import Navbar from "./componentes/Navbar/Navbar.js";
import Funcionarios from "./pages/Funcionarios/Funcionarios.js";
import Historico from "./pages/Historico/Historico.js";
import FinanceiroAluno from "./pages/FinanceiroAluno/FinanceiroAluno.js";
import PaginaAluno from "./pages/PaginaAluno/PaginaAluno.js";
import PaginaFinanceiro from "./pages/PaginaFinanceiro/PaginaFinanceiro.js";

const AppRoutes = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/DadosDosAlunos" element={<DadosDosAlunos/>}></Route>
                <Route path="/Financeiro" element={<Financeiro/>}></Route>
                <Route path="/Turmas" element={<Turmas/>}></Route>
                <Route path="/Funcionarios" element={<Funcionarios/>}></Route>
                <Route path="/DadosDosAlunos/Historico" element={<Historico/>}></Route>
               
                <Route path="/DadosDosAlunos/Financeiro/:id" element={<FinanceiroAluno/>}></Route>
                <Route path="/PaginaAluno/:id" element={<PaginaAluno/>}></Route>
                <Route path="/PaginaFinanceiro/:id" element={<PaginaFinanceiro/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;