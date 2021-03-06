import { defineCE, fixture } from '@open-wc/testing-helpers';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import '@polymer/iron-form/iron-form.js';
import { change } from '@lit/test-helpers';
import { SwitchBase } from '../lit-switch-base.js';

describe('switch', () => {
  const Switch = defineCE(
    class extends SwitchBase {
      static get styles() {
        return super.styles;
      }
    }
  );

  let element;
  let nativeCheckbox;
  let label;

  beforeEach(async () => {
    element = await fixture(
      `<${Switch}>Lit <i>switch</i> with <a href="#">Terms &amp; Conditions</a></${Switch}>`
    );
    nativeCheckbox = element._nativeCheckbox;
    label = element._labelPart;
  });

  it('should define label using light DOM', () => {
    const children = FlattenedNodesObserver.getFlattenedNodes(label);
    expect(children[0].textContent).to.be.equal('Lit ');
    expect(children[1].outerHTML).to.be.equal('<i>switch</i>');
  });

  it('should propagate disabled attribute to the native checkbox', async () => {
    element.disabled = true;
    await element.updateComplete;
    expect(nativeCheckbox.hasAttribute('disabled')).to.be.eql(true);
  });

  it('should toggle on host click', () => {
    element.click();
    expect(element.checked).to.be.true;

    element.click();
    expect(element.checked).to.be.false;
  });

  it('should not toggle on link inside host click', () => {
    const link = FlattenedNodesObserver.getFlattenedNodes(label)[3];
    expect(link.outerHTML).to.be.equal('<a href="#">Terms &amp; Conditions</a>');
    link.click();
    expect(element.checked).to.be.false;
  });

  it('should not toggle on click when disabled', async () => {
    element.disabled = true;
    await element.updateComplete;
    label.click();
    expect(element.checked).to.be.false;
  });

  it('should dispatch `checked-changed` event when checked changes', async () => {
    const spy = sinon.spy();
    element.addEventListener('checked-changed', spy);
    element.checked = true;
    await element.updateComplete;
    expect(spy).to.be.calledOnce;
  });

  it('should bind checked to the native checkbox and vice versa', async () => {
    element.checked = true;
    await element.updateComplete;
    expect(nativeCheckbox.checked).to.be.eql(true);

    nativeCheckbox.checked = false;
    change(nativeCheckbox);
    await element.updateComplete;
    expect(element.checked).to.be.eql(false);
  });

  it('should set aria-checked to "true" when checked', async () => {
    element.checked = true;
    await element.updateComplete;
    expect(element.getAttribute('aria-checked')).to.be.eql('true');
  });

  it('should set aria-checked to "false" when unchecked', async () => {
    element.checked = false;
    await element.updateComplete;
    expect(element.getAttribute('aria-checked')).to.be.eql('false');
  });

  it('should have the `switch` role', () => {
    expect(element.getAttribute('role')).to.be.eql('switch');
  });

  it('should have the `data-action` attribute', () => {
    expect(element.getAttribute('data-action')).to.be.eql('aria-switch');
  });

  it('should set role to `presentation` on the native checkbox', () => {
    expect(nativeCheckbox.getAttribute('role')).to.be.eql('presentation');
  });
});
