import { user_pb } from '../../generated';
import { IsDefined, IsEmail, IsString, MaxLength, ValidateIf } from 'class-validator';

export class CreateReqUser implements user_pb.CreateReqUser.AsObject {
    public email: string;
    public name: string;
    public password: string;
    public avatar: string;
}