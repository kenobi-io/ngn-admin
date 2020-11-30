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
1. npm install grpc-web
2. cmd> where protoc
3. cmd> where protoc-gen-grpc-web 
                  renamen protoc-gen-grpc-web....exe to protoc-gen-grpc-web.exe
4. rename Path (system var) to PATH and add protoc\bin, protoc-gen-grpc-web\bin
5. install cygwin.exe for start .sh file in cmd 
        npm i -g protoc-gen-grpc-web and set ..\AppData\Roaming\npm to PATH
6. work! => try --proto_path instesd -I and try genproto.cmd run in powershell instead bash run .sh
7. proto dir should be without subdirectory
8. all files (js, d.ts, ts) should be generating into one folder(generated) without subdirectory
9. generating index.ts in generate dir through cti lib

## Develop
1. Api
    1. run serve mode microservice from nx `npm api:serve auth`
    2. install nodemon add nodemon config in microservice and run `npm run api:nodemon apps/<NAME_APP>/nodemon-debug.json` and set `auto attach` in setting vscode
        a. Nx + nest + auto attach on => don't work https://github.com/nrwl/nx/issues/3948
        b. create configuration in launch.json - debug and start manual `ng run micro-app-name:serve` - for watch
    ### Configration settings for debug and serve via vscode
    3. Create config `launch.json` and add task that is work in background and contains script for  run `serve`. 
        a. npm install nodemon -g
        b. fix set correct tasks in background (fix `endsPattern`)
        c. add config `auth:debug:nodemon` is work! https://github.com/microsoft/vscode-recipes/tree/master/nodemon
        e. config `auth:debug` work first time, but closed and don't wait for changes before restart like `auth:debug:nodemon` version 