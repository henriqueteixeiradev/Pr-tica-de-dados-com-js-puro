import Estatisticas from "./Estatisticas.js";
import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";
import preencherLista from "./preencherLista.js";
async function handleData() {
    const data = await fetchData("https://api.origamid.dev/json/transacoes.json");
    if (!data)
        return;
    const transacao = data.map(normalizarTransacao);
    preencherTabela(transacao);
    preencherEstatisticas(transacao);
}
function preencherEstatisticas(transacoes) {
    const data = new Estatisticas(transacoes);
    const totalElement = document.querySelector("#total");
    if (!totalElement)
        return;
    totalElement.textContent = data.total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    preencherLista(data.pagamento, "#pagamento");
    preencherLista(data.status, "#status");
    const diaElement = document.querySelector("#dia span");
    if (!diaElement)
        return;
    diaElement.textContent = data.melhorDia[0];
}
function preencherTabela(transacoes) {
    const tabela = document.querySelector("#transacoes tbody");
    if (!tabela)
        return;
    transacoes.forEach((transacao) => {
        tabela.innerHTML += `
      <tr>
        <td>${transacao.nome}</td>
        <td>${transacao.email}</td>
        <td>${"R$ " + transacao.moeda}</td>
        <td>${transacao.pagamento}</td>
        <td>${transacao.status}</td>
      </tr>
    `;
    });
}
handleData();
//# sourceMappingURL=script.js.map