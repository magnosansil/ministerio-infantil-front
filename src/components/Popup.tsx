import React from "react";
import "../styles/Home/Popup.css";

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
        <h2 className="popup-title">{title}</h2>
        <button className="popup-close" onClick={onClose}>
          X
        </button>
        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
