import { ClientError, ServerError, SessionError } from 'ember-error-utils/utils/errors';

/**
  Parse JSON error response and return a custom Error object
  return out first error, else return out 404

  JSON-API returns out an array of errors, with detail, title, source pointers
  http://stackoverflow.com/questions/31918565/handling-errors-with-the-now-default-ember-data-json-api-adapter

  @public
  @method parseError
  @param {Number} code
  @param {String} json
  @return {Error} Custom error, e.g. ServerError
*/
export default function parseError(error) {
  if (error && error.hasOwnProperty('errors')) {
    let { errors } = error;
    return errors.map((err) => {
      return _parseErrorWithResponse(err.status, err);
    })[0];
  } else {
    return _parseErrorWithResponse(404, { detail: 'Something went wrong' });
  }
}

/*
  400, 404, 405, 422
  @private
  @method _parseErrorWithResponse
  @param {Number} code
  @param {Object} response parsed JSON
  @return {Error}
*/
function _parseErrorWithResponse(code, response) {
  let error;
  if (code >= 500) {
    // Response detail is expected to include an i18n key
    error = new ServerError(response.detail, 'error', response, code);
  } else if (code === 403 || code === 401) {
    // Forbidden or Unauthorized
    error = new SessionError(response.detail, 'error', response, code);
  } else {
    //valiation msgs do not return status 422
    let message = _badRequestErrorMessage(response);
    error = new ClientError(message, 'error', response, code);
  }
  return error;
}

// /*
//   @private
//   @method _parseErrorWithoutResponse
//   @param {Number} code
//   @return {Error}
// */
// function _parseErrorWithoutResponse(code) {
//   let error;
//   if (code >= 500) {
//     // enforce i18n key
//     error = new ServerError(undefined, 'error', undefined, code);
//   } else if (code === 403) {
//     error = new SessionError(undefined, 'error', undefined, code);
//   } else if (code >= 400) {
//     error = new ClientError(undefined, 'error', undefined, code);
//   }
//   return error;
// }

/*
  Parse out error message for Bad Request, e.g. 400 error payload

  @private
  @method _badRequestErrorMessage
  @param {Object} response
  @return {String}
*/
function _badRequestErrorMessage(response) {
  // const { detail } = response;
  let fields = Object.keys(response);
  let message = fields.map((attr) => {
    return response[attr];
  }).join(', ');
  return message;
}