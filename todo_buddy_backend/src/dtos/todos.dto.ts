import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator'
import { Priority, Status } from '../models/todo';
import { Timestamp } from 'typeorm';

export class CreateTodoDTO {
    @IsString()
    title: string

    @IsString()
    description: string;

    @IsEnum(Status)
    @IsOptional()
    status?: Status

    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;

    @IsOptional()
    expected_completion_at?: Timestamp;

    @IsString()
    user_id: string;
}


export class UpdateTodoDTO {
    @IsString()
    title!: string;

    @IsString()
    description!: string;

    @IsEnum(Status)
    @IsOptional()
    status!: Status

    @IsEnum(Priority)
    @IsOptional()
    priority!: Priority;

    @IsOptional()
    expected_completion_at!: Timestamp;
}


export class PartiallyUpdateTodoDTO {
    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(Status)
    @IsOptional()
    status?: Status

    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;

    @IsOptional()
    expected_completion_at?: Timestamp;
}




