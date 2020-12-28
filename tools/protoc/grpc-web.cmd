@REM mkdir .\ts\_proto
@REM --grpc-web_out=import_style=typescript,mode=grpcwebtext:%CD%\ts\_proto ^
protoc ^
  --proto_path=.\libs\api\src\lib\core\proto ^
  --plugin=protoc-gen-ts=%CD%\node_modules\.bin\protoc-gen-ts.cmd ^
  --js_out=import_style=commonjs,binary:.\ts\_proto ^
  --ts_out=service=grpc-web:.\ts\_proto ^
  .\libs\api\src\lib\core\proto\*.proto