import { Module } from '@nestjs/common';
import { PatientAuthController } from './patient-auth/patient-auth.controller';
import { StaffAuthController } from './staff-auth/staff-auth.controller';
import { StaffAuthService } from './staff-auth/staff-auth.service';
import { PatientAuthService } from './patient-auth/patient-auth.service';

@Module({
  controllers: [PatientAuthController, StaffAuthController],
  providers: [StaffAuthService, PatientAuthService]
})
export class UserAuthModule {}
