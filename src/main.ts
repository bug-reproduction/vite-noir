import "./style.css";
import noirLogo from "./noir.svg";
import viteLogo from "/vite.svg";
import { setupButton } from "./test-button";

console.log({ encoder: new TextEncoder() });

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://noir-lang.org/" target="_blank">
      <img src="${noirLogo}" class="logo vanilla" alt="Noir logo" />
    </a>
    <h1>Vite + Noir</h1>
    <div class="card">
      <button id="button" type="button">Start (see console)</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and Noir logos to learn more
    </p>
  </div>
`;

setupButton(document.querySelector<HTMLButtonElement>("#button")!);
