import { css } from 'lit-element';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/font-icons.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/typography.js';

export default css`
  /* stylelint-disable font-family-no-missing-generic-family-keyword */
  :host {
    font-family: var(--lumo-font-family);
    outline: none;
  }

  [part='header'] {
    width: 100%;
    outline: none;
    position: relative;
    text-align: left;
    border: none;
    box-shadow: none;
    height: var(--lumo-size-m);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: var(--lumo-font-size-m);
    font-weight: 500;
    color: var(--lumo-secondary-text-color);
    background-color: var(--lumo-contrast-5pct);
    border-radius: var(--lumo-border-radius);
    cursor: default;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :host([focus-ring]) [part='header'] {
    box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);
  }

  [part='summary'] {
    padding-left: var(--lumo-size-m);
  }

  [part='toggle'] {
    position: absolute;
    top: 50%;
    font-size: 1.5em;
    line-height: 1;
    width: 1em;
    height: 1em;
    text-align: center;
    color: var(--lumo-contrast-50pct);
    padding: calc(1em / 4);
    transform: translateY(-50%);
  }

  :host([disabled]) [part='header'],
  :host([disabled]) [part='toggle'] {
    color: var(--lumo-disabled-text-color);
  }

  @media (hover: hover) {
    :host(:not([disabled]):hover) [part='toggle'] {
      color: var(--lumo-contrast-80pct);
    }
  }

  [part='toggle']::before {
    font-family: 'lumo-icons';
    display: inline-block;
    height: 100%;
  }

  :host(:not([expanded])) [part='toggle']::before {
    content: var(--lumo-icons-angle-right);
  }

  :host([expanded]) [part='toggle']::before {
    content: var(--lumo-icons-angle-right);
    transform: rotate(90deg);
  }

  [part='content'] {
    padding: calc(var(--lumo-size-m) / 3);
  }
`;
