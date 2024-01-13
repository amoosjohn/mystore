import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class RegisterDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter a valid email address"})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}