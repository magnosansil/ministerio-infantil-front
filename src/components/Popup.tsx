import React from "react";
import "../styles/Home/Popup.css";
import Close from "../../src/assets/close.png";
import Logo from "../../src/assets/SGMI.png";

interface PopupProps {
  isVisible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({
  isVisible,
  title,
  onClose,
  children,
}) => {
  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <div className="popup-header__left">
            <div className="popup-icon">
              <img src={Logo} alt="icon" width="20" height="20" />
            </div>
            <h2 className="popup-title">{title}</h2>
          </div>
          <button className="popup-close" onClick={onClose}>
            <img src={Close} alt="fechar" width="12" height="12" />
          </button>
        </div>
        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
