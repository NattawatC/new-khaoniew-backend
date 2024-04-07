import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePatientDto {
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

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  medicalCondition?: string[];

  @IsOptional()
  @IsInt()
  healthRiskScore: number;
}
