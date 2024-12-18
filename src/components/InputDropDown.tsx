import React from 'react';

interface Data {
  id: number;
  nome: string;
}
interface InputDropDownProps {
  data: Data[]; 
  style?: React.CSSProperties;
  label?: string
}

function InputDropDown({ data, style }: InputDropDownProps) {
  return (
    <>
      <select style={style} name="turma" id="turma">
        <option value="">Selecione uma turma</option>
        {data.map((turma) => (
          <option key={turma.id} value={turma.id}>
            {turma.nome}
          </option>
        ))}
      </select>
    </>
  );
}

export default InputDropDown;