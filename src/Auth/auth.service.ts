import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserLoginDto } from 'src/patient/dtos/UserLogin.dto';
import { Patient } from 'src/typeorm/entities/Patient';
import { PatientService } from 'src/patient/patient.service'; // Import the PatientService

@Injectable()
export class AuthService {
  constructor(
    private patientService: PatientService,
  ) {}

  async authenticatePatient(userLoginDto: UserLoginDto): Promise<Patient> {
    const { username, password } = userLoginDto;

    // Find the patient by Thai ID using the PatientService
    const patient = await this.patientService.findByThaiId(username);

    // Check password using bcrypt
    const isValidPassword = await compare(password, patient.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    return patient;
  }
}

