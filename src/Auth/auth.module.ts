import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../typeorm/entities/Patient';
import { Staff } from '../typeorm/entities/Staff'; 
import { PatientService } from '../patient/patient.service';
import { StaffService } from '../staff/staff.service';
import { Meal } from 'src/typeorm/entities/Meal';
import { Food } from 'src/typeorm/entities/Food';
import { Feedback } from 'src/typeorm/entities/Feedback';
import { MedicalCondition } from 'src/typeorm/entities/MedicalCondition';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [
    PatientModule,
    TypeOrmModule.forFeature([Patient, Staff, Meal, Food, Feedback, MedicalCondition]),
  ],
  controllers: [AuthController],
  providers: [AuthService, PatientService, StaffService],
})
export class AuthModule {}
