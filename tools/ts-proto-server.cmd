@REM --ts_proto_opt=outputEncodeMethods=false ^
@REM --ts_proto_opt=outputJsonMethods=false ^
protoc --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd ^
--ts_proto_opt=returnObservable=true ^
--ts_proto_opt=useOptionals=true ^
--ts_proto_opt=lowerCaseServiceMethods=true ^
--ts_proto_opt=nestJs=true ^
--ts_proto_opt=addGrpcMetadata=true ^
--ts_proto_opt=addNestjsRestParameter=true ^
--ts_proto_out=. ./libs/api/src/lib/core/proto/auth.proto