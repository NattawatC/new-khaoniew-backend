import { Module } from '@nestjs/common';
import { StaffController } from './controller/staff/staff.controller';
import { StaffService } from './service/staff/staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './typeorm/entity/Staff';

@Module({
  imports: [TypeOrmModule.forFeature([Staff])],
  controllers: [StaffController],
  providers: [StaffService]
})
export class StaffModule {}
