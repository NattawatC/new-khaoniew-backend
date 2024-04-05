import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { User } from './typeorm/entities/User';
import { MedicalCondition } from './typeorm/entities/MedicalCondition';


@Module({
  imports: 
  [TypeOrmModule.forFeature([User, MedicalCondition])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
