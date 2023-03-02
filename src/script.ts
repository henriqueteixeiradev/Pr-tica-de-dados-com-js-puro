import Estatisticas from "./Estatisticas.js";
import fetchData from "./fetchData.js";
import normalizarTransacao, {
  Transacao,
  TransacaoApi,
} from "./normalizarTransacao.js";
import preencherLista from "./preencherLista.js";

async function handleData() {
  const data = await fetchData<TransacaoApi[]>(
    "https://api.origamid.dev/json/transacoes.json"
  );

  if (!data) return;

  const transacao = data.map(normalizarTransacao);

  preencherTabela(transacao);
  preencherEstatisticas(transacao);
}

function preencherEstatisticas(transacoes: Transacao[]): void {
  const data = new Estatisticas(transacoes);

  // Inserção to total no html ------
  const totalElement = document.querySelector("#total");

  if (!totalElement) return;

  totalElement.textContent = data.total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // --------

  // Inserção dos pagamento no html
  preencherLista(data.pagamento, "#pagamento");
  // ------------

  // Inserção dos status no html
  preencherLista(data.status, "#status");
  // ------------

  // Inserção dos dias da semana no html
  const diaElement = document.querySelector("#dia span");

  if (!diaElement) return;

  diaElement.textContent = data.melhorDia[0];
}

function preencherTabela(transacoes: Transacao[]): void {
  const tabela = document.querySelector("#transacoes tbody");

  if (!tabela) return;

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
