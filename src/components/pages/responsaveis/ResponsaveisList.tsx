import React, { useState, useEffect } from 'react';
import { getRequest, deleteRequest } from '../../../services/apiService';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Responsavel {
  cpf: string;
  nome: string;
  telefone: string;
  data_nascimento: string;
  rg: string;
  cep: string;
  endereco: string;
  sexo: string;
  email: string;
}

const ResponsaveisList: React.FC = () => {
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        const data = await getRequest<Responsavel[]>('/responsavel/todos');
        setResponsaveis(data);
      } catch (error) {
        console.error('Erro ao buscar responsáveis', error);
      }
    };
    fetchResponsaveis();
  }, []);

  const handleDelete = async (cpf: string) => {
    try {
      await deleteRequest(`/responsavel/${cpf}`);
      setResponsaveis(responsaveis.filter(responsavel => responsavel.cpf !== cpf));
    } catch (error) {
      console.error('Erro ao excluir responsável', error);
    }
  };

  const filteredResponsaveis = responsaveis.filter(responsavel =>
    responsavel.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Responsáveis</h1>

      <input
        type="text"
        placeholder="Buscar responsável"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredResponsaveis.map((responsavel) => (
          <li key={responsavel.cpf}>
            <span>{responsavel.nome} - {responsavel.telefone} - {responsavel.cpf}</span>
            <button onClick={() => window.location.href = `/responsaveis/editar/${responsavel.cpf}`}>
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(responsavel.cpf)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => window.location.href = '/responsaveis/cadastrar'}>
          Cadastrar Responsável
        </button>
      </div>
    </div>
  );
};

export default ResponsaveisList;
