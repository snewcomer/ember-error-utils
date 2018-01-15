import Component from '@ember/component';
import { get, computed } from '@ember/object';
import layout from '../templates/components/error-template';

/**
  `error-template` handles http response status code errors and other server
  level errors and displays an error page to the user.

  ## default usage

  ```Handlebars
  {{error-template error=model}}
  ```

  @class error-template
  @module Component
  @extends Component
*/
export default Component.extend({
  classNames: ['error-template', 'center-pseudo'],

  layout,

  /**
    Returns a message based on the type of error thrown.

    @property errorClass
    @type String
  */
  errorClass: computed('is404', function() {
    if (this.get('is404')) {
      return 'warning';
    } else {
      return 'danger';
    }
  }),

  /**
    An array of HTTP Status Codes passed by the thrown error.

    @property httpStatusCodes
    @type Array
  */
  // Map the HTTP status codes into an array or
  // an empty array if there are no such status codes
  httpStatusCodes: computed('error', function() {
    let error = get(this, 'error') || { code: 404 };
    return [Number(error.code)];
  }),

  /**
    Determines if an error is a 404 status or not.

    @property is404
    @type Boolean
  */
  is404: computed('httpStatusCodes', function() {
    return this.get('httpStatusCodes').includes(404);
  }),
});