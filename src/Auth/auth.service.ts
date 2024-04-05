// auth.service.ts
import { Injectable } from '@nestjs/common';
import { PatientService } from 'src/patient/patient.service';
import { compare } from 'bcrypt';
import { UserLoginDto } from 'src/patient/dtos/UserLogin.dto';
import { Patient } from 'src/typeorm/entities/Patient';

@Injectable()
export class AuthService {
  constructor(
    private readonly patientService: PatientService,
    // private readonly staffService: StaffService,
  ) {}

  async authenticatePatient(userLoginDto: UserLoginDto): Promise<Patient | null> {
    // Retrieve patient from the database based on the Thai ID
    const patient = await this.patientService.findByThaiId(userLoginDto.username);

    // Check if the patient exists and if the password matches
    // if (patient) {
    //   const isAuthenticated = await compare(userLoginDto.password, patient.password); // Compare hashed passwords
    //   return { isAuthenticated };
    // }
    return patient;
  }

//   async authenticateStaff(fullname: string, password: string): Promise<{ isAuthenticated: boolean }> {
//     // Retrieve staff member from the database based on the full name
//     const staff = await this.staffService.findByFullname(fullname);

//     // Check if the staff member exists and if the password matches
//     if (staff) {
//       const isAuthenticated = await compare(password, staff.password); // Compare hashed passwords
//       return { isAuthenticated };
//     }
//     return { isAuthenticated: false };
//   }
}
