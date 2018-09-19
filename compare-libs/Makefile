.PHONY: \
	protobuf \
	grpc-web-by-grpc \
	grpc-web-by-improbable-eng

all: \
	protobuf \
	grpc-web-by-grpc \
	grpc-web-by-improbable-eng

PROTO_OUT := out/protobuf

protobuf: proto/hello.proto
	mkdir -p $(PROTO_OUT)
	protoc -I . \
		--js_out="import_style=commonjs,binary:$(PROTO_OUT)" \
		$<

GRPC_OUT := out/grpc-web-by-grpc

grpc-web-by-grpc: proto/hello.proto
	mkdir -p $(GRPC_OUT)
	protoc -I . \
		--js_out="import_style=commonjs,binary:$(GRPC_OUT)" \
		--grpc-web_out="import_style=commonjs+dts,mode=grpcwebtext:$(GRPC_OUT)" \
		$<

IMPRO_OUT := out/grpc-web-by-improbable-eng

grpc-web-by-improbable-eng: proto/hello.proto
	mkdir -p $(IMPRO_OUT)
	protoc -I . \
		--js_out="import_style=commonjs,binary:$(IMPRO_OUT)" \
		--ts_out="service=true:$(IMPRO_OUT)" \
		$<
