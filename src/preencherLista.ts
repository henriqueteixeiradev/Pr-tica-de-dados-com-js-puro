import { CountList } from "./countBy";

export default function preencherLista(
  lista: CountList,
  containerId: string
): void {
  const containerElement = document.querySelector(containerId);

  if (containerElement) {
    Object.keys(lista).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
    });
  }
}
