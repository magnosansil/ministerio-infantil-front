import React from 'react';
import InputComponent from './InputComponent';
import InputDropDown from './InputDropDown';

const FormAdd: React.FC = () => {
  const FormData: string[] = [
    "nome", "cpf", "nascimento", "rg", "sexo", "cep", "logradouro", "bairro", 
    "cidade", "uf", "numero", "complemento", "telefone", "email", "idCrianca", "relacaoCrianca"
  ];

  const dataDropdown = [
    { id: 1, nome: 'Turma 1' },
    { id: 2, nome: 'Turma 2' },
    { id: 3, nome: 'Turma 3' },
    { id: 4, nome: 'Turma 4' },
    { id: 5, nome: 'Turma 5' },
  ];
  

  const sexoOptions = [
    { id: 1, nome: 'Homem' },
    { id: 2, nome: 'Mulher' },
  ];

  const ufOptions = [
    { id: 1, nome: 'São Paulo' },
    { id: 2, nome: 'Rio de Janeiro' },
    { id: 3, nome: 'Minas Gerais' },
  ];

  let inputBoolean;

  return (
    <div className="input-container">
        <form action="">
            {FormData.map((item: string, key) => {
                inputBoolean = item === "nome" || item === "cpf" || item === "nascimento" ||
                            item === "rg" || item === "cep" || item === "logradouro" || 
                            item === "bairro" || item === "cidade" || item === "numero" || 
                            item === "complemento" || item === "telefone" || item === "email";

                if (inputBoolean) {
        
                if (item === "nome" || item === "cpf" ) {
                    return (
                    <InputComponent 
                        key={key}
                        label={item.charAt(0).toUpperCase() + item.slice(1)}
                        type="text"
                        placeholder={`Digite o ${item}`}
                        style={{ width: '35%', border: 'solid 2px black' }}
                    />
                    );
                }
                if (item === "rg" || item === "cep" || item === "numero") {
                    return (
                    <InputComponent 
                        key={key}
                        label={item.charAt(0).toUpperCase() + item.slice(1)}
                        type="number"
                        placeholder={`Digite o ${item}`}
                        style={{ width: '35%', border: 'solid 2px black' }}
                    />
                    );
                    }
                
                
                if (item === "nascimento") {
                    return (
                    <InputComponent
                        key={key}
                        label="Nascimento"
                        type="date"
                        placeholder="Selecione sua data de nascimento"
                        style={{ width: '35%', border: 'solid 2px black' }}
                    />
                    );
                }
                
                if (item === "telefone") {
                    return (
                    <InputComponent
                        key={key}
                        label="Telefone"
                        type="tel"
                        placeholder="Digite seu telefone"
                        style={{ width: '35%', border: 'solid 2px black' }}
                    />
                    );
                }
                
                if (item === "email") {
                    return (
                    <InputComponent
                        key={key}
                        label="E-mail"
                        type="email"
                        placeholder="Digite seu e-mail"
                        style={{ width: '35%', border: 'solid 2px black' }}
                    />
                    );
                }

                if (item === "sexo") {
                    return (
                    <InputDropDown
                        key={key}
                        label="Sexo"
                        data={sexoOptions}
                        style={{ width: '35%', border: 'solid 2px black' }}
                    />
                    );
                }

                if (item === "uf") {
                    return (
                    <InputDropDown
                        key={key}
                        label="UF"
                        data={ufOptions}
                        style={{ width: '35%', border: 'solid 2px black' }}
                    />
                    );
                }


                if (item === "idCrianca" || item === "relacaoCrianca") {
                    return (
                    <InputDropDown
                        key={key}
                        label={item === "idCrianca" ? "ID da Criança" : "Relação com a Criança"}
                        data={dataDropdown}
                        style={{ width: '35%', border: 'solid 2px black' }}
                    />
                    );
                }


                return (
                    <InputComponent
                    key={key}
                    label={item.charAt(0).toUpperCase() + item.slice(1)}
                    type="text"
                    placeholder={`Digite o ${item}`}
                    style={{ width: '35%', border: 'solid 2px black' }}
                    />
                );
                }

                return null;
            })}
        </form>
    </div>
  );
};

export default FormAdd;
