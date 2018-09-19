// package: hello
// file: proto/hello.proto

var proto_hello_pb = require("../proto/hello_pb");
var grpc = require("grpc-web-client").grpc;

var Greeting = (function () {
  function Greeting() {}
  Greeting.serviceName = "hello.Greeting";
  return Greeting;
}());

Greeting.Hello = {
  methodName: "Hello",
  service: Greeting,
  requestStream: false,
  responseStream: false,
  requestType: proto_hello_pb.Empty,
  responseType: proto_hello_pb.Empty
};

exports.Greeting = Greeting;

function GreetingClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GreetingClient.prototype.hello = function hello(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Greeting.Hello, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

exports.GreetingClient = GreetingClient;

