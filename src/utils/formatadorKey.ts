export const formatKeyTitle = (key: string): string => {
  let formattedKey = key.replace(/^fk/, "");
  formattedKey = formattedKey.replace(/_/g, " ");

  const replaceAccentedChars = (text: string): string => {
    const charMap: Record<string, string> = {
      'á': '&aacute;',
      'í': '&iacute;',
      'ç': '&ccedil;',
    };
  
    return text.replace(/[áíç]/g, (match) => charMap[match] || match);
  };

  const specialCases: Record<string, string> = {
    cpf: "CPF",
    id: "ID",
    doenca: "Doença",
    restricao: "Restrição",
    responsavel: "Responsável",
    sanguineo: "Sanguíneo",
    rg: "RG",
    cep: "CEP",
    endereco: "Endereço",
    minima: "Mínima",
    maxima: "Máxima"
  };


  formattedKey = formattedKey.replace(/\b(id)\b/g, "ID");

  formattedKey = formattedKey.replace(/\b\w+/g, (match) => {
    const lowerMatch = match.toLowerCase();

    if (specialCases[lowerMatch]) {
      return specialCases[lowerMatch]; 
    }

    return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
  });

  return formattedKey;
};
