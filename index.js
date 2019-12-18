// Vanilla implementation has a lot of overhead.
class VanillaNav extends HTMLElement {
  constructor(props) {
    super();
    const links = JSON.parse(this.getAttribute("links"));
    this.links = [...links];
  }
  // Lifecycle method for the mounting of the component
  connectedCallback() {
    this.render();
  }
  render() {
    // Mapping to the inner HTML will cause commas to be rendered if
    // the Array's join method is not used.
    this.innerHTML = this.links
      .map(({ label, path }) => `<button href="${path}">${label}</button>`)
      .join("");
  }
}

customElements.define("vanilla-nav", VanillaNav);

// Hybrids approach
// https://hybrids.js.org/

// Hot module reloading supported out of the box.
import { html, define, property } from "hybrids";

export function handleNavClick(e) {
  console.log(e);
}

export const HybridsNav = {
  links: property(navLinks => navLinks && JSON.parse(navLinks)),
  render: ({ links }) => {
    const navButtons =
      links &&
      links.map(
        ({ label, path }) =>
          html`
            <button onclick=${handleNavClick}>${label}</button>
          `
      );
    return html`
      ${navButtons}
    `;
  }
};

define("hybrids-nav", HybridsNav);
