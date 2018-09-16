/**
 * @fileoverview gRPC-Web generated client stub for hello
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.hello = require('./hello_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hello.GreetingClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.hello.GreetingPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.hello.GreetingClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.hello.GreetingClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.hello.Empty,
 *   !proto.hello.Empty>}
 */
const methodInfo_Hello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.hello.Empty,
  /** @param {!proto.hello.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.hello.Empty.deserializeBinary
);


/**
 * @param {!proto.hello.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.hello.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.hello.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.hello.GreetingClient.prototype.hello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/hello.Greeting/Hello',
      request,
      metadata,
      methodInfo_Hello,
      callback);
};


/**
 * @param {!proto.hello.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.hello.Empty>}
 *     The XHR Node Readable Stream
 */
proto.hello.GreetingPromiseClient.prototype.hello =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.hello(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.hello;

