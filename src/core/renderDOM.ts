import Block from './Block';

export default function renderDOM(rootSelector: string, component: Block): void {
  const root = document.querySelector(rootSelector);
  if (!root) {
    throw new Error(`Root selector "${rootSelector}" not found`);
  }
  root.innerHTML = '';
  root.appendChild(component.getContent() as Node);
}
