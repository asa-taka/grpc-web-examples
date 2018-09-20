package main

import (
	"flag"
	"fmt"
	"net/http"

	"github.com/golang/glog"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"golang.org/x/net/context"
	"google.golang.org/grpc"

	gw "github.com/asa-taka/grpc-web-examples/grpc-gateway/proto"
)

var (
	grpcEndpoint = flag.String("grpc-endpoint", "localhost:10000", "endpoint of YourService")
	port         = flag.Int("port", 10002, "gRPC server port")
)

func run() error {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithInsecure()}
	err := gw.RegisterEchoServiceHandlerFromEndpoint(ctx, mux, *grpcEndpoint, opts)
	if err != nil {
		return err
	}

	glog.Infof("grpc-gateway server starts on http://localhost:%d", *port)
	glog.Infof("grpc-gateway proxies to %s", *grpcEndpoint)
	return http.ListenAndServe(fmt.Sprintf("localhost:%d", *port), mux)
}

func main() {
	flag.Parse()
	defer glog.Flush()

	if err := run(); err != nil {
		glog.Fatal(err)
	}
}
