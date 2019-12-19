// Vanilla implementation has a lot of overhead.
class VanillaNav extends HTMLElement {
  constructor() {
    super();
    // Attributes are always passed in as strings
    const links = JSON.parse(this.getAttribute("links"));
    this.links = [...links];
    this.addEventListener("click", e =>
      console.log(e.target.getAttribute("href"))
    );
  }
  // Lifecycle method for the mounting of the component
  connectedCallback() {
    this.render();
  }
  render() {
    // Mapping to the inner HTML will cause commas to be rendered if
    // the Array's join method is not used.
    const linkList = this.links
      .map(({ label, path }) => `<button href="${path}">${label}</button>`)
      .join("");

    this.innerHTML = `<div>${linkList}</div>
      <style>
        div {
          display: flex;
          background: papayawhip;
          padding: 12px;
        }

        button {
          background: darkseagreen;
          color: white;
          font-size: 14px;
          border: none;
          padding-right: 10px;
        }
      </style>`;
  }
}

customElements.define("vanilla-nav", VanillaNav);

// Vanilla Dropdown
class VanillaDropdown extends HTMLElement {
  constructor() {
    super();
    // Attributes are always passed in as strings
    const links = JSON.parse(this.getAttribute("links"));
    this.links = [...links];
    this.addEventListener("click", e =>
      console.log(e.target.getAttribute("href"))
    );
  }
  // Lifecycle method for the mounting of the component
  connectedCallback() {
    this.render();
  }
  render() {
    // Mapping to the inner HTML will cause commas to be rendered if
    // the Array's join method is not used.
    const linkList = this.links
      .map(({ label, path }) => `<button href="${path}">${label}</button>`)
      .join("");

    this.innerHTML = `<div>${linkList}</div>
      <style>
        div {
          display: flex;
          background: papayawhip;
          padding: 12px;
        }

        button {
          background: darkseagreen;
          color: white;
          font-size: 14px;
          border: none;
          padding-right: 10px;
        }
      </style>`;
  }
}

customElements.define("vanilla-dropdown", VanillaDropdown);

// Hybrids approach
// https://hybrids.js.org/

import { html, define, property } from "hybrids";

export function handleNavClick(path) {
  console.log(path);
}

// Hybrids simpler and more functional approach to declaring components
export const HybridsNav = {
  // The attribute passed to the components is accepted via property
  links: property(navLinks => navLinks && JSON.parse(navLinks)),
  // Similar render function to a React functional component.
  render: ({ links }) => {
    const navButtons =
      links &&
      links.map(
        ({ label, path }) =>
          html`
            <button onclick=${handleNavClick.bind(this, path)}>${label}</button>
          `
      );
    return html`
      <div>
        ${navButtons}
      </div>
      <style>
        :host {
          display: flex;
          background: papayawhip;
          padding: 12px;
        }

        button {
          background: darkseagreen;
          color: white;
          font-size: 14px;
          border: none;
          padding-right: 10px;
        }
      </style>
    `;
  }
};

define("hybrids-nav", HybridsNav);
