import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './typeorm/entities/Patient';
import { PatientModule } from './patient/patient.module';
import { Meal } from './typeorm/entities/Meal';
import { Food } from './typeorm/entities/Food';
import { Feedback } from './typeorm/entities/Feedback';
import { UserModule } from './user/user.module';
import { User } from './user/typeorm/entities/User';
import { MedicalCondition } from './user/typeorm/entities/MedicalCondition';
import { UserController } from './user/controller/user/user.controller';
import { UserService } from './user/service/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Co2345jj8',
      database: 'db1',
      entities: [User, MedicalCondition],
      synchronize: true,
      logging: true,
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
