'http://localhost:3333/api.auth.AuthService/auth'-H 'Pragma: no-cache' -H 'X-User-Agent: grpc-web-javascript/0.1' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.9' -H 'custom-header-1: value1' -H 'Content-Type: application/grpc-web+proto' -H 'Accept: */*' -H 'X-Grpc-Web: 1' -H 'Cache-Control: no-cache' -H 'Connection: keep-alive' --data-binary $'\x00\x00\x00\x00\x05\n\x03abc' --compressed

'http://localhost:3333/api.auth.AuthService/auth' -H 'Pragma: no-cache' -H 'X-User-Agent: grpc-web-javascript/0.1' -H 'Origin: http://localhost:8081' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.9' -H 'custom-header-1: value1' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36' -H 'Content-Type: application/grpc-web+proto' -H 'Accept: */*' -H 'X-Grpc-Web: 1' -H 'Cache-Control: no-cache' -H 'Referer: http://localhost:8081/echotest.html' -H 'Connection: keep-alive' --data-binary $'\x00\x00\x00\x00\x05\n\x03abc' --compressed

grpcurl -plaintext - import-path ./hero -proto hero.proto \
 -H 'X-Grpc-From: auth' -d '{ "id": "2"}' \
 127.0.0.1:3001 hero.HeroService/FindOne

 grpcurl -plaintext -proto D:\repositories\public\nest\sample\04-grpc\src\hero\hero.proto -H 'X-Grpc-From: auth' -d '{ "id": "2"}'  127.0.0.1:3001 hero.HeroService/FindOne

docker run -d -v "$(pwd)":/envoy.yaml:/etc/envoy/envoy.yaml:ro -p 3001:3001 envoyproxy/envoy:v1.16.1

 .\curl.exe -vv  -k --raw -X GET --http2 -H "Content-Type: application/grpc" -d '{"id": "1"}' http://127.0.0.1:3001/hero.HeroService/FindOne

 docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro -p 8080:8080 -p 8081:8081 envoyproxy/envoy:v1.16.1

 -d '{"email": "asdf", "password": "asdfasdfasdf"}'
 --data "email=asdf&password=asdfasdfasdf"

 grpcc -i --proto .\libs\api\src\lib\core\proto\auth.proto --address localhost:50051