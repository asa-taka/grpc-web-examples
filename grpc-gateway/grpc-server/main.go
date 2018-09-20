package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/golang/glog"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	"github.com/improbable-eng/grpc-web/go/grpcweb"

	"github.com/asa-taka/grpc-web-examples/grpc-gateway/grpc-server/echo"
)

var (
	port    = flag.Int("port", 10000, "gRPC server port")
	webPort = flag.Int("web-port", 10001, "gRPC-Web server port")
)

func main() {
	flag.Parse()

	grpcServer := grpc.NewServer(
		grpc.UnaryInterceptor(logUnaryInterceptor),
	)

	// Register service implementations
	echo.RegisterNewServer(grpcServer)

	reflection.Register(grpcServer) // for grpc_cli

	// Run both gRPC/gRPC-Web
	go runGrpcWebServer(grpcServer, *webPort)
	runGrpcServer(grpcServer, *port)
}

func runGrpcServer(grpcServer *grpc.Server, port int) {
	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	glog.Infof("gRPC server starts on localhost:%d", port)
	grpcServer.Serve(lis)
}

func runGrpcWebServer(grpcServer *grpc.Server, port int) {
	wrappedServer := grpcweb.WrapServer(grpcServer)
	handler := func(resp http.ResponseWriter, req *http.Request) {
		wrappedServer.ServeHTTP(resp, req)
	}

	httpServer := http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: http.HandlerFunc(handler),
	}

	glog.Infof("gRPC-Web server starts on http://localhost:%d", port)
	if err := httpServer.ListenAndServe(); err != nil {
		glog.Fatalf("failed starting http server: %v", err)
	}
}

// gRPC Interceptor
// ----------------

func logUnaryInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (res interface{}, err error) {
	res, err = handler(ctx, req)
	method := info.FullMethod
	if err == nil {
		glog.Infof("%s: OK", method)
		if glog.V(1) {
			glog.Infof("%s Request: %v", method, req)
			glog.Infof("%s Response: %v", method, res)
		}
	} else {
		glog.Errorf("%s: %v", method, err)
		if glog.V(1) {
			glog.Infof("%s Request: %v", method, req)
		}
	}
	return res, err
}
