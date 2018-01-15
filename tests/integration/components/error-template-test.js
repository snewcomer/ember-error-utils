import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from '../../pages/components/error-template';

let page = PageObject.create(component);

module('Integration | Component | error template', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    page.setContext(this);
  });
  hooks.afterEach(function() {
    page.removeContext();
  });

  test('it renders all required elements for the 404 case', async function(assert) {
    let error = {
      code: 404
    };

    this.set('model', error);
    await render(hbs`{{error-template error=model}}`);

    assert.equal(page.title, '404 Error', 'The title renders');
    assert.equal(page.body, "We can't find the page you're looking for.", 'The body renders');
    assert.equal(page.button.text, 'Home', 'The button renders');
  });

  test('it renders all required elements for the general error case', async function(assert) {
    let error = {
      code: 500
    };

    this.set('model', error);
    await render(hbs`{{error-template error=model}}`);

    assert.equal(page.title, 'Server Error', 'The title renders');
    assert.equal(page.body, 'Something went wrong. Try again and if the problem persists, please report your problem and mention what caused it.', 'The body renders');
    assert.equal(page.button.text, 'Home', 'The button renders');
  });
});
