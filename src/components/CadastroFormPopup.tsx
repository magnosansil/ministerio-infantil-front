import React, { useState } from "react";
import { formatKeyTitle } from "../utils/formatadorKey";

type CadastroFormPopupProps = {
  isVisible: boolean;
  primaryKey: string;
  columns: string[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onCancel: () => void;
  successMessage?: string;
  errorMessage?: string | null;
};

const CadastroFormPopup: React.FC<CadastroFormPopupProps> = ({
  isVisible,
  primaryKey,
  columns,
  onSubmit,
  onCancel,
  successMessage,
  errorMessage,
}) => {
  const initialState = columns.reduce((acc, column) => {
    acc[column] = "";
    return acc;
  }, {} as Record<string, any>);

  const [formData, setFormData] = useState<Record<string, any>>(initialState);

  if (!isVisible) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {successMessage && (
        <div
          style={{
            textAlign: "center",
            color: "green",
            marginBottom: "15px",
          }}
        >
          <strong>{successMessage}</strong>
        </div>
      )}
      {errorMessage && (
        <div
          style={{
            textAlign: "center",
            color: "red",
            marginBottom: "15px",
          }}
        >
          <strong>{errorMessage}</strong>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "60vh",
          overflow: "auto",
        }}
      >
        {columns.map((key) => {
          if (key === primaryKey) {
            return null;
          }
          return (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <label
                htmlFor={key}
                style={{ minWidth: "120px", fontWeight: "bold" }}
              >
                {formatKeyTitle(key)}:
              </label>
              <input
                type="text"
                id={key}
                value={formData[key] || ""}
                onChange={(e) => handleChange(e, key)}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <button
          onClick={onCancel}
          style={{
            padding: "10px 15px",
            backgroundColor: "#ccc",
            color: "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default CadastroFormPopup;
