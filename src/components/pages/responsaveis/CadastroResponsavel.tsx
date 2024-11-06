import React, { useState } from 'react';
import { postRequest } from '../../../services/apiService';

const CadastroResponsavel: React.FC = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const novoResponsavel = { nome, telefone, email };
    
    try {
      await postRequest('/responsavel/cadastrar', novoResponsavel);
      window.location.href = '/responsaveis';
    } catch (error) {
      console.error('Erro ao cadastrar responsável', error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Responsável</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroResponsavel;
