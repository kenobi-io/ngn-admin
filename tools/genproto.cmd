@REM mkdir -p "generated"
@REM --js_out is required param https://developers.google.com/protocol-buffers/docs/reference/javascript-generated#compiler-options
protoc ^
--proto_path=.\libs\api-interfaces\src\lib\proto ^
--js_out=import_style=commonjs:.\libs\api-interfaces\src\lib\generated\ ^
--grpc-web_out=import_style=typescript,mode=grpcwebtext:.\libs\api-interfaces\src\lib\generated ^
.\libs\api-interfaces\src\lib\proto\*.proto && npm run cti