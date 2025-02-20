export default function extractFirstFloatNumberFromString(str: string): number | null {
    // Substitui vírgulas por pontos para tratar separadores decimais.
    const normalizedStr = str.replace(',', '.');
    
    // Expressão regular para identificar um número de ponto flutuante.
    const regex = /[+-]?\d+(\.\d+)?/g;
    
    // Obtém a primeira ocorrência que corresponde à expressão.
    const match = normalizedStr.match(regex);
    
    // Converte a ocorrência para número ou retorna null se não houver correspondência.
    return match ? parseFloat(match[0]) : null;
  }
  