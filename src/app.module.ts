import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './typeorm/entities/Patient';
import { PatientModule } from './patient/patient.module';
import { Meal } from './typeorm/entities/Meal';
import { Food } from './typeorm/entities/Food';
import { Feedback } from './typeorm/entities/Feedback';
import { MedicalCondition } from './typeorm/entities/MedicalCondition';
import { Staff } from './typeorm/entities/Staff';
import { StaffModule } from './staff/staff.module';
import { AuthModule } from './auth/auth.module';
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 31666,
      username: 'admin',
      password: 'admin',
      database: 'khaoniew',
      entities: [Patient, Meal, Food, Feedback, MedicalCondition, Staff],
      synchronize: true,
      // logging: true,
    }),
    PatientModule,
    StaffModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
