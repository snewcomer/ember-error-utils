/**
  @class ServerError
  @constructor
  @param {String} message
  @param {String} level of notice, e.g. critical, error, info, default value is 'error'
  @param {Object} response (optional)
  @param {Number} code (optional)
  @return {Error}
*/
export function ServerError(message = 'errors.server.default', level = 'error', response = null, code = null) {
  return _setErrorProps.call(this, 'ServerError', message, level, response, code);
}
// set prototype to an Error type
ServerError.prototype = _errorProtoFactory(ServerError);

/**
  @class ClientError
  @constructor
  @param {String} message
  @param {String} level of notice, e.g. critical, error, info, default value is 'error'
  @param {Object} response (optional)
  @param {Number} code (optional)
  @return {Error}
*/
export function ClientError(message = 'errors.client.default', level = 'error', response = null, code = null) {
  return _setErrorProps.call(this, 'ClientError', message, level, response, code);
}
ClientError.prototype = _errorProtoFactory(ClientError);

/**
  @class SessionError
  @constructor
  @param {String} message
  @param {String} level of notice, e.g. critical, error, info, default value is 'error'
  @param {Object} response (optional)
  @param {Number} code (optional)
  @return {Error}
*/
export function SessionError(message = 'errors.session.error', level = 'error', response = null, code = null) {
  return _setErrorProps.call(this, 'SessionError', message, level, response, code);
}
SessionError.prototype = _errorProtoFactory(SessionError);

/*
  @private
  @method _setErrorProps
  @return Error
*/
function _setErrorProps(name, message, level, response, code) {
  let _error = Error.prototype.constructor.call(this, message);
  _error.name = this.name = name;
  this.stack = _error.stack;
  this.message = _error.message;
  this.name = name;
  this.response = response;
  this.errors = (response) ? response.errors || null : null;
  this.code = (response && response.status) ? response.status : code;
  this.level = level;
  return this;
}

/*
  @method _errorProtoFactory
  @return {Object} - Error type whose constructor is the passed in ctor (e.g. ClientError function)
*/
function _errorProtoFactory(ctor) {
  return Object.create(Error.prototype, {
    constructor: {
      value: ctor,
      writable: true,
      configurable: true
    }
  });
}

/*
  Notes:
  - `Error.prototype.constructor.call` is calling super
  - `ctor` is Client/Server/Session -Error function (constructor)
*/