package echo

import (
	"context"
	"sync"

	"google.golang.org/grpc"

	pb "github.com/asa-taka/grpc-web-examples/grpc-gateway/proto"
)

func RegisterNewServer(grpcServer *grpc.Server) {
	pb.RegisterEchoServiceServer(grpcServer, newServer())
}

type echoServer struct {
	mu sync.Mutex
}

func newServer() *echoServer {
	return &echoServer{}
}

// rpc Handlers
// ------------

func (s *echoServer) Echo(ctx context.Context, in *pb.EchoPayload) (*pb.EchoPayload, error) {
	return in, nil
}
