/**
 * Recebe string '1.200,50' e retorna number 1200.50
 * @param moeda 
 * @returns number | null
 */

export default function moedaParaNumero(moeda: string): number | null {
  const numero = Number(moeda.replaceAll(".", "").replace(",", "."));

  return isNaN(numero) ? null : numero;
}
