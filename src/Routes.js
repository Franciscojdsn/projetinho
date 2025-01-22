import React from "react";
import Home from "./Home.js";
import Contato from "./DadosDosAlunos.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/contato" element={<Contato/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;