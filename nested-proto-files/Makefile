.PHONY: simple nested

all: simple nested

SIMPLE_OUT := simple/out

simple: simple/proto/hello.proto
	mkdir -p $(SIMPLE_OUT)
	protoc -I simple/proto \
		--js_out="import_style=commonjs,binary:$(SIMPLE_OUT)" \
		--grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:$(SIMPLE_OUT) \
		$<

NESTED_OUT := nested/out

nested: nested/proto/module/sub/hello.proto
	mkdir -p $(NESTED_OUT)
	protoc -I nested/proto \
		--js_out="import_style=commonjs,binary:$(NESTED_OUT)" \
		--grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:$(NESTED_OUT) \
		$<
