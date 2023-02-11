import React, { useState } from "react";
import "../App.css";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;