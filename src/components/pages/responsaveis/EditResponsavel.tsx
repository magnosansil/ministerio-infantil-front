import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRequest, patchRequest } from "../../../services/apiService";

const EditResponsavel: React.FC = () => {
  const { cpf } = useParams<{ cpf: string }>();
  const [responsavel, setResponsavel] = useState<any>(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchResponsavel = async () => {
      try {
        const data: any = await getRequest(`/responsavel/${cpf}`);
        setResponsavel(data);
        setNome(data.nome);
        setTelefone(data.telefone);
        setEmail(data.email);
      } catch (error) {
        console.error("Erro ao buscar responsável", error);
      }
    };
    fetchResponsavel();
  }, [cpf]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { nome, telefone, email };

    try {
      await patchRequest(`/responsavel/${cpf}`, updatedData);
      window.location.href = "/responsaveis";
    } catch (error) {
      console.error("Erro ao atualizar responsável", error);
    }
  };

  return responsavel ? (
    <div>
      <h1>Editar Responsável</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Telefone"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <button type="submit">Atualizar</button>
      </form>
    </div>
  ) : (
    <p>Carregando...</p>
  );
};

export default EditResponsavel;
