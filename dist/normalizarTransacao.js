import moedaParaNumero from "./moedaParaNumero.js";
import stringParaData from "./stringParaData.js";
export default function normalizarTransacao(transacao) {
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
//# sourceMappingURL=normalizarTransacao.js.map