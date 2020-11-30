@REM mkdir -p "generated"
@REM --js_out is required param https://developers.google.com/protocol-buffers/docs/reference/javascript-generated#compiler-options
protoc ^
--proto_path=.\libs\api\src\lib\core\proto ^
--js_out=import_style=commonjs:.\libs\api\src\lib\core\generated\ ^
--grpc-web_out=import_style=typescript,mode=grpcwebtext:.\libs\api\src\lib\core\generated ^
.\libs\api\src\lib\core\proto\*.proto && npm run cti