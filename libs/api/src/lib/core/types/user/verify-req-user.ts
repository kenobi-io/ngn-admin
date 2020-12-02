import { user_pb, ReqAuth } from "@api/core";

export class VerifyReqUser implements user_pb.VerifyReqUser.AsObject {
    public email: string;
    public password: string;
}