import { user_pb } from '../../generated';
import { IsDefined, IsEmail, IsString, MaxLength, ValidateIf } from 'class-validator';

export class CreateReqUser implements user_pb.CreateReqUser.AsObject {
    
    @IsDefined()
    @IsEmail()
    @MaxLength(50)
    public email: string;

    @IsDefined()
    @IsString()
    @MaxLength(50)
    public name: string;

    @IsDefined()
    @IsString()
    @MaxLength(128)
    public password: string;

    @ValidateIf(user => user.avatar)
    @IsString()
    @MaxLength(500)
    public avatar: string;
}