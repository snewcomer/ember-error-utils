import {
  clickable,
  isVisible,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.error-template',

  body: text('p:first'),

  button: {
    scope: '[data-test-error-link-home]',
    text: text()
  },

  clickLink: clickable('a'),

  has404Image: isVisible('.not-found-img'),
  hasServerErrorImage: isVisible('.server-error-img'),

  title: text('h1')
};