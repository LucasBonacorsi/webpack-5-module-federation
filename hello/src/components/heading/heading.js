import './heading.scss'

export default class Heading {
  render(pageName) {
    const h1 = document.createElement("h1");
    const body = document.querySelector("body");
    h1.innerHTML = pageName;
    body.appendChild(h1);
  }
}
