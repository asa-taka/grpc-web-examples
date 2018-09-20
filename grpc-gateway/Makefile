GO_OUT := server/proto

.PHONY: go go-grpc-gateway

all: go go-grpc-gateway

go:
	protoc -I . \
		--go_out="plugins=grpc:$(GO_OUT)" \
		proto/echo.proto

go-grpc-gateway:
	protoc -I . \
		-I$GOPATH/src \
		-I$GOPATH/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
		--grpc-gateway_out=logtostderr=true,grpc_api_configuration=proto/echo.yaml:$(GO_OUT) \
		proto/echo.proto
