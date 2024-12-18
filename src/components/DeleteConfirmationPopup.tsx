import React from "react";
import { formatKeyTitle } from "../utils/formatadorKey";
import { formatCPF } from "../utils/formatadorDados";
import Warning from "../assets/warning.png";

type DeleteConfirmationPopupProps = {
  isVisible: boolean;
  deleteTargetRow: Record<string, any> | null;
  primaryKey: string;
  handleDelete: () => void;
  handleCancel: () => void;
  deleteSuccess: boolean;
  deleteError: string | null;
};
const DeleteConfirmationPopup: React.FC<DeleteConfirmationPopupProps> = ({
  isVisible,
  deleteTargetRow,
  primaryKey,
  handleDelete,
  handleCancel,
  deleteSuccess,
  deleteError,
}) => {
  if (!isVisible || !deleteTargetRow) return null;

  return (
    <div>
      {deleteSuccess ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
          }}
        >
          <p>
            <strong>Cadastro excluído com sucesso</strong>
          </p>
        </div>
      ) : deleteError ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
          }}
        >
          <p>
            <strong style={{ color: "red" }}>{deleteError}</strong>
          </p>
        </div>
      ) : (
        <>
          <p
            style={{
              marginBottom: "20px",
            }}
          >
            Tem certeza de que deseja excluir este cadastro?
          </p>
          <p>
            <strong>
              {formatKeyTitle(primaryKey)}:{" "}
              {primaryKey === "cpf"
                ? formatCPF(deleteTargetRow[primaryKey])
                : deleteTargetRow[primaryKey]}
              <br />
              {deleteTargetRow.nome && <>Nome: {deleteTargetRow.nome}</>}
            </strong>
          </p>
          <p
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              color: "red",
              fontSize: "20px",
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <img src={Warning} alt="Atenção" width="30px" />
            Esta ação é irreversível
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
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
              onClick={handleDelete}
              style={{
                padding: "10px 15px",
                backgroundColor: "#d9534f",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Excluir
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteConfirmationPopup;
