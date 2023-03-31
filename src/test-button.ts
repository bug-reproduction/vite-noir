import { test } from "./circuit";

export function setupButton(element: HTMLButtonElement) {
  element.addEventListener("click", () => test());
}
