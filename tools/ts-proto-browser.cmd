protoc --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd ^
--ts_proto_opt=returnObservable=true ^
--ts_proto_opt=useOptionals=true ^
--ts_proto_opt=lowerCaseServiceMethods=true ^
--ts_proto_opt=outputClientImpl=grpc-web ^
--ts_proto_opt=addGrpcMetadata=true ^
--ts_proto_out=. ./libs/api/src/lib/core/proto/auth.proto
