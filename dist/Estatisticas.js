import countBy from "./countBy.js";
function filtrarValor(transacao) {
    return transacao.valor !== null;
}
export default class Estatisticas {
    transacoes;
    total;
    pagamento;
    status;
    semana;
    melhorDia;
    constructor(transacoes) {
        this.transacoes = transacoes;
        this.total = this.setTotal();
        this.pagamento = this.setPagamento();
        this.status = this.setStatus();
        this.semana = this.setSemana();
        this.melhorDia = this.setMelhorDia();
    }
    setTotal() {
        return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
            return acc + item.valor;
        }, 0);
    }
    setPagamento() {
        return countBy(this.transacoes.map(({ pagamento }) => pagamento));
    }
    setStatus() {
        return countBy(this.transacoes.map(({ status }) => status));
    }
    setSemana() {
        const semana = {
            Domingo: 0,
            Segunda: 0,
            ["Terça"]: 0,
            Quarta: 0,
            Quinta: 0,
            Sexta: 0,
            ["Sábado"]: 0,
        };
        for (let i = 0; i < this.transacoes.length; i++) {
            const dia = this.transacoes[i].data.getDay();
            if (dia === 0)
                semana.Domingo += 1;
            if (dia === 1)
                semana.Segunda += 1;
            if (dia === 2)
                semana["Terça"] += 1;
            if (dia === 3)
                semana.Quarta += 1;
            if (dia === 4)
                semana.Quinta += 1;
            if (dia === 5)
                semana.Sexta += 1;
            if (dia === 6)
                semana["Sábado"] += 1;
        }
        return semana;
    }
    setMelhorDia() {
        const dias = Object.entries(this.semana).sort((a, b) => b[1] - a[1]);
        return dias[0];
    }
}
//# sourceMappingURL=Estatisticas.js.map