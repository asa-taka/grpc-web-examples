import * as grpcWeb from 'grpc-web';
import {
  HelloRequest,
  HelloResponse} from './hello_pb';

export class GreetingClient {
  constructor (hostname: string,
               credentials: {},
               options: { [s: string]: {}; });

  hello(
    request: HelloRequest,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: HelloResponse) => void
  ): grpcWeb.ClientReadableStream;

}

