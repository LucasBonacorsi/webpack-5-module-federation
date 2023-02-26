import './heading.scss'

export default class Heading {
  constructor(title){
    this.title = title;
  }
  render() {
    const h1 = document.createElement("h1");
    const body = document.querySelector("body");
    h1.innerHTML = this.title;
    body.appendChild(h1);
  }
}
