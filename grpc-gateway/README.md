# grpc-gateway

## Run Servers

```
$ go run grpc-server/main.go -v 2 -logtostderr=true
I0921 02:32:20.624230   77867 main.go:62] gRPC-Web server starts on http://localhost:10001
I0921 02:32:20.625213   77867 main.go:47] gRPC server starts on localhost:10000
```

```
$ go run grpc-gateway/main.go -v 2 -logtostderr=true
I0921 02:30:18.806575   77796 main.go:33] grpc-gateway server starts on http://localhost:10002
I0921 02:30:18.806600   77796 main.go:34] grpc-gateway proxies to localhost:10000
```

## Send Requests

### For the gRPC Server Directly

```sh
grpc_cli call localhost:10000 Echo "message: 'test'"
```

then grpc-server logs

```
I0921 02:35:04.983782   77867 main.go:75] /echo.EchoService/Echo: OK
I0921 02:35:04.983796   77867 main.go:77] /echo.EchoService/Echo Request: message:"test"
I0921 02:35:04.983808   77867 main.go:78] /echo.EchoService/Echo Response: message:"test"
```

### For the grpc-gateway Proxied Endpoint

```sh
curl -XPOST localhost:10002/echo -d'{ "message" : "test" }'
```

then grpc-server logs same as above.

```
I0921 02:33:56.094820   77867 main.go:75] /echo.EchoService/Echo: OK
I0921 02:33:56.094837   77867 main.go:77] /echo.EchoService/Echo Request: message:"test"
I0921 02:33:56.094885   77867 main.go:78] /echo.EchoService/Echo Response: message:"test"
```
