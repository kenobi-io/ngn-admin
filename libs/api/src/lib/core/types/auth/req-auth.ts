import { auth_pb  } from "../../generated";

export class ReqAuth implements auth_pb.ReqAuth.AsObject {
    public email: string;
    public password: string;
}