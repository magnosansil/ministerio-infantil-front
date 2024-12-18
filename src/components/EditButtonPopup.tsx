import React, { useState, useEffect } from "react";
import { formatKeyTitle } from "../utils/formatadorKey";
import { formatCPF } from "../utils/formatadorDados";
import EditIcon from "../assets/lapis.png";

type EditConfirmationPopupProps = {
  isVisible: boolean;
  editTargetRow: Record<string, any> | null;
  primaryKey: string;
  handleEdit: (updatedRow: any) => Promise<void>;
  handleCancel: () => void;
  editSuccess: boolean;
  editError: string | null;
};

const EditConfirmationPopup: React.FC<EditConfirmationPopupProps> = ({
  isVisible,
  editTargetRow,
  primaryKey,
  handleEdit,
  handleCancel,
  editSuccess,
  editError,
}) => {
  const [editedData, setEditedData] = useState(editTargetRow || {});

  useEffect(() => {
    setEditedData(editTargetRow || {});
  }, [editTargetRow]);

  if (!isVisible || !editTargetRow) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setEditedData({
      ...editedData,
      [key]: e.target.value,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      {editSuccess && (
        <div style={{ textAlign: "center", color: "green", marginBottom: "15px" }}>
          <strong>Cadastro editado com sucesso!</strong>
        </div>
      )}
      {editError && (
        <div style={{ textAlign: "center", color: "red", marginBottom: "15px" }}>
          <strong>{editError}</strong>
        </div>
      )}

      {!editSuccess && !editError && (
        <>
          <p>
            <strong>
              {formatKeyTitle(primaryKey)}:{" "}
              {primaryKey === "cpf"
                ? formatCPF(editTargetRow[primaryKey])
                : editTargetRow[primaryKey]}
              <br />
              {editTargetRow.nome && <>Nome: {editTargetRow.nome}</>}
            </strong>
          </p>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {Object.entries(editTargetRow).map(([key, value]) => {
              const isCPFField = key === "cpf_professor" || key === "cpf_responsavel";
              if (key !== primaryKey) {
                return (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <label htmlFor={key} style={{ minWidth: "120px", fontWeight: "bold" }}>
                      {formatKeyTitle(key)}:
                    </label>
                    <input
                      type="text"
                      id={key}
                      value={editedData[key] || ""}
                      disabled={isCPFField}
                      onChange={(e) => handleChange(e, key)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        backgroundColor: isCPFField ? "#f5f5f5" : "white",
                        color: isCPFField ? "#999" : "#000",
                      }}
                    />
                  </div>
                );
              }
              return null;
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
              onClick={handleCancel}
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
              onClick={() => handleEdit(editedData)}
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
        </>
      )}
    </div>
  );
};

export default EditConfirmationPopup;
