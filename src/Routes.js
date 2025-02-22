import React from "react";
import Home from "./Home.js";
import Turmas from "./Turmas.js"
import Financeiro from "./Financeiro.js";
import DadosDosAlunos from "./DadosDosAlunos.js";
import Navbar from "./componentes/Navbar/index.js";
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Funcionarios from "./Funcionarios.js";
import Historico from "./Historico.js";
import FinanceiroAluno from "./componentes/Financeiro/FinanceiroAluno.js";
import InfoFuncionarios from "./componentes/Funcionarios/InfoFuncionarios.js";

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
                <Route path="/DadosDosAlunos/FinanceiroAluno" element={<FinanceiroAluno/>}></Route>
                <Route path="/Funcionarios/InfoFuncionarios" element={<InfoFuncionarios/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;