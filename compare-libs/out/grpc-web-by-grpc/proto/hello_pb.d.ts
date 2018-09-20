export class HelloRequest {
  constructor ();
  getMessage(): string;
  setMessage(a: string): void;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => HelloRequest;
}

export class HelloResponse {
  constructor ();
  getMessage(): string;
  setMessage(a: string): void;
  getProfile(): {};
  setProfile(a: {}): void;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => HelloResponse;
}

