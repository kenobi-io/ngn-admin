@REM for /f %G in ('dir /b ..\\proto\\*.proto') do grpc_tools_node_protoc ^ 
@REM --plugin=protoc-gen-ng=.\\node_modules\\.bin\\protoc-gen-ng.cmd ^
@REM --ng_out=.\\output\\path -I ..\\proto ..\\proto\\%G

protoc --plugin=protoc-gen-ng=%CD%\node_modules\.bin\protoc-gen-ng.cmd ^
--ng_out=libs\api\src\lib\core\generated\browser  ^
-I .\libs\api\src\lib\core\proto .\libs\api\src\lib\core\proto\*.proto