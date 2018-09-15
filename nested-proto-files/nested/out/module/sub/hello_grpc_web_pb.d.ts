import * as grpcWeb from 'grpc-web';
import {
  Empty} from './hello_pb';

export class GreetingClient {
  constructor (hostname: string,
               credentials: {},
               options: { [s: string]: {}; });

  hello(
    request: Empty,
    metadata: grpcWeb.Metadata,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream;

}

