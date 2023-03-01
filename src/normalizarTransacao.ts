import moedaParaNumero from "./moedaParaNumero.js";
import stringParaData from "./stringParaData.js";

type TransacaoPagamento = "Boleto" | "Cartão de Crédito";
type TransacaoStatus =
  | "Paga"
  | "Recusada pela operadora de cartão"
  | "Aguardando Pagamento"
  | "Estornada";

export interface TransacaoApi {
  Status: TransacaoStatus;
  ID: number;
  Data: string;
  Nome: string;
  Email: string;
  ["Forma de Pagamento"]: TransacaoPagamento;
  ["Valor (R$)"]: string;
  ["Cliente Novo"]: number;
}

export interface Transacao {
  status: TransacaoStatus;
  id: number;
  data: Date;
  nome: string;
  email: string;
  moeda: string;
  valor: number | null;
  pagamento: TransacaoPagamento;
  novo: boolean;
}

export default function normalizarTransacao(
  transacao: TransacaoApi
): Transacao {
  return {
    status: transacao.Status,
    id: transacao.ID,
    data: stringParaData(transacao.Data),
    nome: transacao.Nome,
    email: transacao.Email,
    moeda: transacao["Valor (R$)"],
    valor: moedaParaNumero(transacao["Valor (R$)"]),
    pagamento: transacao["Forma de Pagamento"],
    novo: Boolean(transacao["Cliente Novo"]),
  };
}
