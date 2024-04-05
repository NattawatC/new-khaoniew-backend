import { IsString, IsInt, IsNotEmpty} from 'class-validator';

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    thaiId: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsInt()
    age: number;

    medicalconditions?: string[];

    @IsNotEmpty()
    @IsString()
    password: string;
}