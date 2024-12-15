// src/pages/HomePage.tsx
import React, { useState } from "react";
import Popup from "../components/Popup";
import Header from "../components/Header";
import "../styles/Home/Home.css";

const HomePage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedCrud, setSelectedCrud] = useState("");

  const handleActionSelect = (action: string, crud: string) => {
    setSelectedAction(action);
    setSelectedCrud(crud);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="home-page">
      <Header onActionSelect={handleActionSelect} />
      <Popup
        isVisible={isPopupVisible}
        title={`${selectedAction} - ${selectedCrud}`}
        onClose={handleClosePopup}
      >
        <p>Aqui será o conteúdo para a ação: {selectedAction}</p>
      </Popup>
    </div>
  );
};

export default HomePage;
