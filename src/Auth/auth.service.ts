import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserLoginDto } from 'src/patient/dtos/UserLogin.dto';
import { Patient } from 'src/typeorm/entities/Patient';
import { PatientService } from 'src/patient/patient.service'; // Import the PatientService
import { Staff } from 'src/typeorm/entities/Staff';

@Injectable()
export class AuthService {
  constructor(
    private patientService: PatientService, private staffService: StaffService
  ) {}
  async authenticateUser(userLoginDto: UserLoginDto): Promise<Patient | Staff> {
    const { username, password } = userLoginDto;

    // Check if username is numeric (assuming only patient Thai IDs are numeric)
    if (!isNaN(Number(username))) {
      // Find the patient by Thai ID using the PatientService
      const patient = await this.patientService.findByThaiId(username);

      // Check password using bcrypt
      const isValidPassword = await compare(password, patient.password);

      if (!isValidPassword) {
        throw new UnauthorizedException('Wrong password');
      }

      return patient;
    } else {
      // Find the staff by fullname using the StaffService
      const staff = await this.staffService.findByFullName(username);

      // Check password using bcrypt
      const isValidPassword = await compare(password, staff.password);

      if (!isValidPassword) {
        throw new UnauthorizedException('Wrong password');
      }

      return staff;
    }
  }
}
