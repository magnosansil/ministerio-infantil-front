import React from "react";
import "../styles/Home/Header.css";

const crudOptions = [
  {
    name: "Crianças",
    actions: ["Cadastrar", "Editar", "Pesquisar", "Excluir"],
  },
  {
    name: "Responsáveis",
    actions: ["Cadastrar", "Editar", "Pesquisar", "Excluir"],
  },
  {
    name: "Professores",
    actions: ["Cadastrar", "Editar", "Pesquisar", "Excluir"],
  },
  { name: "Turmas", actions: ["Cadastrar", "Editar", "Pesquisar", "Excluir"] },
];

interface HeaderProps {
  onActionSelect: (crud: string, action: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onActionSelect }) => {
  return (
    <header className="home-menu">
      <nav className="home-nav">
        <ul className="home-nav__list">
          {crudOptions.map((crud) => (
            <li className="home-nav__option" key={crud.name}>
              {crud.name}
              <ul className="home-nav__dropdown">
                {crud.actions.map((action) => (
                  <li className="home-nav__dropdown-option" key={action}>
                    <button onClick={() => onActionSelect(crud.name, action)}>
                      {action}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
