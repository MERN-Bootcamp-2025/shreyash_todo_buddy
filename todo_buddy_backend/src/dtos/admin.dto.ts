import { IsEmail, Matches, IsEnum, IsString, MinLength, MaxLength } from 'class-validator'
import { UserRole } from '../models/user';

export class AdminDtoInviteUser {
    @IsString()
    name: string

    @IsEmail()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Invalid Email address' })
    email: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsString()
    user_id: string;
}


export class AdminLoginDTO {
    @IsEmail()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Invalid Email address' })
    email: string;

    @IsString()
    @MinLength(4)
    password: string;
}


