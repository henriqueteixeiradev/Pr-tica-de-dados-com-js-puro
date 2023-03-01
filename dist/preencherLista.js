export default function preencherLista(lista, containerId) {
    const containerElement = document.querySelector(containerId);
    if (containerElement) {
        Object.keys(lista).forEach((key) => {
            containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
        });
    }
}
//# sourceMappingURL=preencherLista.js.map