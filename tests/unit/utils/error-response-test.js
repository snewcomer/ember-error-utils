import parseError from 'ember-error-utils/utils/error-response';
import { module, test } from 'qunit';
import { ServerError, ClientError } from 'ember-error-utils/utils/errors';

module('Unit | Utility | error response');

test('Parses XHR error response and returns a custom error type', function(assert) {
  let error = parseError({"errors":[{"status": 500, "detail": "i18n-key"}]});
  assert.ok(error instanceof ServerError, 'returns ServerError');
});

test('Returns custom error type with "message" property', function(assert) {
  let error = parseError({"errors":[{"status": 500, "detail": "i18n-key"}]});
  assert.equal(error.message, 'i18n-key', 'uses error message from payload');
});

test('Without valid JSON, returns custom error type with "message" property', function(assert) {
  let error = parseError({"errors":[{"status": 500, "detail": "i18n-key"}]});
  assert.equal(error.message, 'i18n-key', 'default message is "errors.server.default"');
});

test('Returns custom error type with "level" property', function(assert) {
  let error = parseError({"errors":[{"status": 500, "detail": "i18n-key"}]});
  assert.equal(error.level, 'error', 'default level is "error"');
});

test('Returns ClientError for 400 error', function(assert) {
  let error = parseError({"errors":[{"status": 400, "detail": "i18n-key"}]});
  assert.ok(error instanceof ClientError, 'error type is ClientError');
});

test('formats the attribute error responses from a 400 error', function(assert) {
  let error = parseError({"errors":[{"status": 400, "detail": "i18n-key"}]});
  assert.equal(error.message, '400, i18n-key', 'default message is "errors.server.default"');
  assert.equal(error.level, 'error', 'level for 400');
});