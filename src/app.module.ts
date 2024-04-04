import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './typeorm/entities/Patient';
import { PatientModule } from './patient/patient.module';
import { Meal } from './typeorm/entities/Meal';
import { Food } from './typeorm/entities/Food';
import { Feedback } from './typeorm/entities/Feedback';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 31666,
      username: 'admin',
      password: 'admin',
      database: 'khaoniew',
      entities: [Patient, Meal, Food, Feedback],
      synchronize: true,
    }),
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
