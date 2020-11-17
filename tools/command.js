'protoc --plugin=protoc-gen-ts="{ABSOLUTEPATH}\node_modules\.bin\protoc-gen-ts.cmd" 
--js_out="import_style=commonjs,binary:src/app/generated" 
--ts_out="service=grpc-web:src/app/generated" src/app/protos/{YOURPROTOFILENAME}.proto'