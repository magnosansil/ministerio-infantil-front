import React, { useState } from "react";
import { formatKeyTitle } from "../utils/formatadorKey";
import {
  formatCPF,
  formatTelefone,
  formatData,
} from "../utils/formatadorDados";
import Popup from "../components/Popup";
import Arrow from "../assets/arrow.png";
import View from "../assets/olho.png";
import Edit from "../assets/lapis.png";
import Delete from "../assets/lixeira.png";
import FormAdd from "./FormAdd";

interface DataTableProps {
  data: any[];
  crudName: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, crudName }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isCadastroPopupVisible, setCadastroPopupVisible] = useState(false);
  const [currentRowData, setCurrentRowData] = useState<any>(null);
  const [currentPopupTitle, setCurrentPopupTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  if (!data || data.length === 0) {
    return <p>Nenhum dado encontrado.</p>;
  }

  const columns = Object.keys(data[0]);

  const formatValue = (column: string, value: any) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }
    if (column.includes("cpf")) {
      return formatCPF(value);
    } else if (column.includes("telefone")) {
      return formatTelefone(value);
    } else if (column.includes("data")) {
      return formatData(value);
    }
    return value;
  };

  const searchableColumns = ["nome", "cpf"];

  const idColumns = columns.filter((col) => col.startsWith("id"));

  if (idColumns.length > 0) {
    searchableColumns.push(idColumns[0]);
  }

  const filteredData = data.filter((row) => {
    return searchableColumns.some((col) => {
      const value = String(row[col]).toLowerCase();
      return value.includes(searchTerm.toLowerCase());
    });
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handleOpenPopup = (action: string, rowData: any) => {
    setPopupVisible(true);
    setCurrentRowData(rowData);
    setCurrentPopupTitle(action);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleCadastrar = () => {
    setCadastroPopupVisible(true);
  };

  const handleCloseCadastroPopup = () => {
    setCadastroPopupVisible(false);
  };

  const getPrimaryKey = (crudName: string) => {
    const primaryKeys: { [key: string]: string } = {
      Crianças: "id",
      Responsáveis: "cpf",
      Professores: "cpf",
      Turmas: "id_turma",
    };
    return primaryKeys[crudName] || "";
  };

  const primaryKey = getPrimaryKey(crudName);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nome, ID ou CPF"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
          maxWidth: "550px",
          border: "2px solid #000",
          borderRadius: "4px",
        }}
      />

      <div
        className="table-wrapper"
        style={{
          maxHeight: "56vh",
          overflow: "auto",
          margin: "10px 0 20px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "2px solid #000",
          }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    textAlign: "left",
                    backgroundColor: "#b8b8b8",
                    textWrap: "nowrap",
                    maxWidth: "200px",
                    minWidth: "100px",
                  }}
                >
                  {formatKeyTitle(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((row, index) => (
                <tr
                  key={row[primaryKey]}
                  data-key={row[primaryKey]}
                  style={{
                    backgroundColor: index % 2 === 0 ? "transparent" : "white",
                    textWrap: "nowrap",
                    position: "relative",
                  }}
                >
                  {columns.map((col) => (
                    <td
                      key={col}
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {formatValue(col, row[col])}
                    </td>
                  ))}
                  <td
                    className="action-icons"
                    style={{
                      border: "1px solid black",
                      backgroundColor: "#003884",
                      padding: "8px 15px",
                      position: "sticky",
                      right: "0",
                    }}
                  >
                    <img
                      src={View}
                      alt="Visualizar"
                      onClick={() =>
                        handleOpenPopup("Visualizar Cadastro", row)
                      }
                      style={{
                        cursor: "pointer",
                        width: "16px",
                        height: "auto",
                        marginRight: "15px",
                      }}
                    />
                    <img
                      src={Edit}
                      alt="Editar"
                      onClick={() => handleOpenPopup("Editar Cadastro", row)}
                      style={{
                        cursor: "pointer",
                        width: "16px",
                        height: "auto",
                        marginRight: "15px",
                      }}
                    />
                    <img
                      src={Delete}
                      alt="Excluir"
                      onClick={() => handleOpenPopup("Excluir Cadastro", row)}
                      style={{
                        cursor: "pointer",
                        width: "16px",
                        height: "auto",
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  style={{ textAlign: "left", padding: "20px" }}
                >
                  Nenhum dado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="btn-action"
          style={{
            padding: "5px 10px",
            margin: "0 5px",
            backgroundColor: currentPage === 1 ? "#ccc" : "#003884",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          <img
            src={Arrow}
            alt="Anterior"
            style={{
              width: "8px",
              height: "8px",
              rotate: "180deg",
            }}
          />
        </button>
        <span style={{ margin: "0 10px" }}>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="btn-action"
          style={{
            padding: "5px 10px",
            margin: "0 5px",
            backgroundColor: currentPage === totalPages ? "#ccc" : "#003884",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          <img
            src={Arrow}
            alt="Próximo"
            style={{
              width: "8px",
              height: "8px",
            }}
          />
        </button>
      </div>
      <button
        onClick={handleCadastrar}
        className="btn-action"
        style={{
          display: "block",
          marginLeft: "auto",
          padding: "10px 20px",
          backgroundColor: "#003884",
          color: "#FFF",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "0.3s ease",
        }}
      >
        Cadastrar {crudName}
      </button>

      <Popup
        isVisible={isCadastroPopupVisible}
        title={`Cadastrar ${crudName}`}
        onClose={handleCloseCadastroPopup}
      >
        <h2>Formulário de Cadastro</h2>
        <FormAdd/>
      </Popup>

      <Popup
        isVisible={isPopupVisible}
        title={currentPopupTitle}
        onClose={handleClosePopup}
      >
        {currentRowData && (
          <div>
            {Object.entries(currentRowData).map(([key, value]) => (
              <p key={key}>
                <strong>{formatKeyTitle(key)}:</strong> {String(value)}
              </p>
            ))}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default DataTable;
