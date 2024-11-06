import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsaveisList from "./components/pages/responsaveis/ResponsaveisList";
import EditResponsavel from "./components/pages/responsaveis/EditResponsavel";
import CadastroResponsavel from "./components/pages/responsaveis/CadastroResponsavel";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/responsaveis" element={<ResponsaveisList />} />
          <Route path="/responsaveis/editar" element={<EditResponsavel />} />
          <Route path="/responsaveis/cadastrar" element={<CadastroResponsavel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
