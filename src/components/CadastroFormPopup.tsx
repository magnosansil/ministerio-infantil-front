import React, { useState, useEffect } from "react";
import { formatKeyTitle } from "../utils/formatadorKey";

const CadastroFormPopup: React.FC<{
  isVisible: boolean;
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>; // Alterado
  onCancel: () => void; // Alterado
  successMessage?: string;
  errorMessage?: string | null;
  requiredFields?: string[];
  dropdownOptions?: Record<string, string[]>; // Chave do campo e array de opções
}> = ({
  isVisible,
  initialData = {},
  onSubmit, // Alterado
  onCancel, // Alterado
  successMessage,
  errorMessage,
  requiredFields = [],
  dropdownOptions = {},
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  if (!isVisible) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string
  ) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Este campo é obrigatório.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {successMessage && (
        <div style={{ textAlign: "center", color: "green", marginBottom: "15px" }}>
          <strong>{successMessage}</strong>
        </div>
      )}
      {errorMessage && (
        <div style={{ textAlign: "center", color: "red", marginBottom: "15px" }}>
          <strong>{errorMessage}</strong>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {Object.entries({ ...initialData, ...formData }).map(([key, value]) => {
          const isDropdown = dropdownOptions[key];
          return (
            <div key={key} style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor={key} style={{ fontWeight: "bold" }}>
                {formatKeyTitle(key)}:{requiredFields.includes(key) && " *"}
              </label>

              {isDropdown ? (
                <select
                  id={key}
                  value={formData[key] || ""}
                  onChange={(e) => handleChange(e, key)}
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="">Selecione uma opção</option>
                  {dropdownOptions[key]?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id={key}
                  value={formData[key] || ""}
                  onChange={(e) => handleChange(e, key)}
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              )}

              {errors[key] && (
                <span style={{ color: "red", fontSize: "12px" }}>{errors[key]}</span>
              )}
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
          onClick={handleFormSubmit}
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
