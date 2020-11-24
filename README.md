# NgnAdmin
## GRPS
1. https://medium.com/ngx/nestjs-angular-grpc-f8eca5404fc7
2. https://www.npmjs.com/package/grpc-web 
    npm install grpc-web 
    download protoc-gen-grpc-web https://github.com/grpc/grpc-web/releases
3 ?. clone https://github.com/protocolbuffers/protobuf/releases/latest
4 ?. install vcpkg
5 ?. cmd vcpkg> vcpkg install protobuf protobuf:x64-windows
6. download protoc-3.14.0-win64.zip copy to C:\Program Files and protoc-gen-grpc-web-1.2.1-windows-x86_64.exe
      cmd > set PATH=%PATH%;C:\Program Files\protoc\bin
      cmd > set PATH=%PATH%;C:\Program Files\protoc\protoc-gen-grpc-web\bin 
!! DON'T work, finaly ;(
## GRPS try 2
1. requeremnent intall protoc in system
2. npm install ts-protoc-gen
2. npm install google-protobuf
2. npm install @types/google-protobuf
3. npm install @improbable-eng/grpc-web
!! DON'T work, finaly as expect;(
## GRPS try 3
   npm install grpc-web
   cmd> where protoc
   cmd> where protoc-gen-grpc-web 
                    renamen protoc-gen-grpc-web....exe to protoc-gen-grpc-web.exe
   rename Path (system var) to PATH and add protoc\bin, protoc-gen-grpc-web\bin
   install cygwin.exe for start .sh file in cmd

   work! => try --proto_path instesd -I and try .cmd run powershell instead bash run .sh