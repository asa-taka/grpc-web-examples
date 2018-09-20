// package: hello
// file: proto/hello.proto

import * as proto_hello_pb from "../proto/hello_pb";
import {grpc} from "grpc-web-client";

type GreetingHello = {
  readonly methodName: string;
  readonly service: typeof Greeting;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_hello_pb.HelloRequest;
  readonly responseType: typeof proto_hello_pb.HelloResponse;
};

export class Greeting {
  static readonly serviceName: string;
  static readonly Hello: GreetingHello;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }
export type ServiceClientOptions = { transport: grpc.TransportConstructor; debug?: boolean }

interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}

export class GreetingClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: ServiceClientOptions);
  hello(
    requestMessage: proto_hello_pb.HelloRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: proto_hello_pb.HelloResponse|null) => void
  ): void;
  hello(
    requestMessage: proto_hello_pb.HelloRequest,
    callback: (error: ServiceError, responseMessage: proto_hello_pb.HelloResponse|null) => void
  ): void;
}

