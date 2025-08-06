import { IsEmail, Matches, IsEnum, IsString, MinLength, MaxLength } from 'class-validator'
import { UserRole } from '../models/user';
import { Priority, Status } from '../models/todo';
import { Timestamp } from 'typeorm';

export class CreateTodosDTO {
    @IsString()
    title: string

    @IsString()
    description: string;

    @IsEnum(Status)
    status?: Status

    @IsEnum(Priority)
    priority?: Priority;

    expected_completion_at?: Timestamp;

    @IsString()
    user_id: string;
}



