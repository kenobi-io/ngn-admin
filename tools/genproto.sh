
# PROTOC_GEN_TS_PATH="node_modules/.bin/protoc-gen-ts.cmd"
# PROTOC_OUT_DIR="libs/api/src/lib/.tmp"
# DIR="libs/api/src/lib/proto/user/user.proto"

# mkdir -p "generated"
# protoc \
#        --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
#        --js_out="import_style=commonjs,binary:${PROTOC_OUT_DIR}" \
#        --ts_out="service=grpc-web:${PROTOC_OUT_DIR}" \
#        /mnt/d/repositories/ngn-admin/libs/api/src/lib/proto/user/user.proto
       # ./libs/api/src/lib/proto/index.proto
       # ./libs/api/src/lib/proto/index.proto
    #    ./libs/api/src/lib/proto/common/stub.proto



# # Path to this plugin, Note this must be an abolsute path on Windows (see #15)
# PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# # Directory to write generated code to (.js and .d.ts files)
# OUT_DIR="./libs/api/src/lib/proto/.tmp"

# protoc \
#     --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
#     --js_out="import_style=commonjs,binary:${OUT_DIR}" \
#     --ts_out="service=grpc-web:${OUT_DIR}" \
#     users.proto base.proto

# # Path to this plugin
# PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# # Directory to write generated code to (.js and .d.ts files)
# OUT_DIR="./generated"

# protoc \
#     --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
#     --js_out="import_style=commonjs,binary:${OUT_DIR}" \
#     --ts_out="${OUT_DIR}" \
#     users.proto base.proto


# protoc -I=$DIR \
#   --js_out=import_style=commonjs,binary:$PROTOC_OUT_DIR \
#   --grpc-web_out=import_style=typescript,mode=grpcwebtext:$PROTOC_OUT_DIR

# protoc -I=$DIR \
#     --js_out=import_style=commonjs:$PROTOC_OUT_DIR \
#     --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$PROTOC_OUT_DIR

## GRPS try 2
# protoc --plugin=protoc-gen-ts="./node_modules/.bin/protoc-gen-ts.cmd"
#        --js_out="import_style=commonjs,binary:./libs/api/src/lib/.tmp"
#        --ts_out="service=grpc-web:./libs/api/src/lib/.tmp" "libs/api/src/lib/proto/user/user.proto"

# PROTOC_GEN_TS_PATH="%CD%/node_modules/.bin/protoc-gen-ts.cmd"
# OUT_DIR="D:\repositories\ngn-admin\generated"
# protoc \
#     --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
#     --js_out="import_style=commonjs+dts,binary:${OUT_DIR}" \
#     libs/api/src/lib/proto/user/user.proto libs/api/src/lib/proto/auth/auth.proto


# protoc -I=.libs/api/src/lib/proto/user/user.proto \
# --js_out=import_style=commonjs:generated \
# --grpc-web_out=import_style=commonjs,mode=grpcwebtext:generated

## GRPS try 3

protoc --proto_path=./libs/api/src/lib/core/proto/user \
       --js_out=import_style=commonjs:/mnt/d/repositories/ngn-admin/libs/api/src/lib/core/generated \
       --grpc-web_out=import_style=typescript:/mnt/d/repositories/ngn-admin/libs/api/src/lib/core/generated user.proto
       