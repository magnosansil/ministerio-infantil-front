// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import Popup from "../components/Popup";
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import { fetchData } from "../services/apiService";
import "../styles/Home/Home.css";

const Spinner = () => <div className="spinner"></div>;
const HomePage: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedCrud, setSelectedCrud] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleActionSelect = (crud: string, action: string) => {
    setSelectedCrud(crud);
    setSelectedAction(action);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setTableData([]);
  };

  const getEndpointForCrud = (crud: string): string => {
    switch (crud) {
      case "Crianças":
        return "/crianca/todos";
      case "Responsáveis":
        return "/responsavel/todos";
      case "Professores":
        return "/professor/todos";
      case "Turmas":
        return "/turma/todos";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (selectedAction === "Pesquisar" && selectedCrud) {
      const endpoint = getEndpointForCrud(selectedCrud);
      if (endpoint) {
        fetchData(endpoint).then((data) => setTableData(data));
      }
    }
  }, [selectedAction, selectedCrud]);

  return (
    <div className="home-page">
      <Header onActionSelect={handleActionSelect} />

      <Popup
        isVisible={isPopupVisible}
        title={`${selectedAction} ${selectedCrud}`}
        onClose={handleClosePopup}
      >
        {selectedAction === "Pesquisar" ? (
          loading ? (
            <Spinner /> 
          ) : (
            <DataTable data={tableData} crudName={selectedCrud} />
          )
        ) : (
          <p>Aqui será o conteúdo para a ação: {selectedAction}</p>
        )}
      </Popup>
    </div>
  );
};

export default HomePage;
