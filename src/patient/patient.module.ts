import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient } from 'src/typeorm/entities/Patient';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from 'src/typeorm/entities/Meal';
import { Food } from 'src/typeorm/entities/Food';
import { Feedback } from 'src/typeorm/entities/Feedback';
import { MedicalCondition } from 'src/typeorm/entities/MedicalCondition';
import { AuthService } from 'src/Auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Meal, Food, Feedback, MedicalCondition])],
  controllers: [PatientController],
  providers: [PatientService, AuthService],
})
export class PatientModule {}
