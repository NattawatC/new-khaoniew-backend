import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dtos/CreatePatient.dto';
import { UpdatePatientDto } from './dtos/UpdatePatient.dto';
import { CreatePatientMealDto } from './dtos/CreatePatientMeal.dto';
import { CreateFoodDto } from './dtos/CreateFood.dto';
import { CreateFeedbackDto } from './dtos/CreateFeedback.dto';
import { Patient } from 'src/typeorm/entities/Patient';
import { AuthService } from 'src/Auth/auth.service';
import { UserLoginDto } from './dtos/UserLogin.dto';

@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService, private readonly authService: AuthService) {}

  @Get(':thaiId')
  async findByThaiId(@Param('thaiId') thaiId: string): Promise<Patient> {
    return this.patientService.findByThaiId(thaiId);
  }

  @Get()
  async getPatient() {
    const patients = await this.patientService.findPatient();
    return patients;
  }

  @Post()
  createPateint(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }

  @Patch(':id')
  async updatePatient(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    await this.patientService.updatePatient(id, updatePatientDto);
  }

  @Delete(':id')
  async deletePatientById(@Param('id', ParseIntPipe) id: string) {
    await this.patientService.deletePatient(id);
  }

  @Post(':id/meals')
  createMeal(
    @Param('id', ParseIntPipe) id: string,
    @Body() createMealDetails: CreatePatientMealDto,
  ) {
    return this.patientService.createPatientMeal(id, createMealDetails);
  }

  @Delete(':id/meals/:mealId')
  deleteMeal(
    @Param('id', ParseIntPipe) id: string,
    @Param('mealId', ParseIntPipe) mealId: number,
  ) {
    return this.patientService.deletePatientMeal(id, mealId);
  }

  @Post(':id/meals/:mealId/foods')
  createFood(
    @Param('id', ParseIntPipe) id: string,
    @Param('mealId', ParseIntPipe) mealId: number,
    @Body() createFoodDto: CreateFoodDto,
  ) {
    return this.patientService.createFood(id, mealId, createFoodDto);
  }

  @Post(':id/meals/:mealId/feedbacks')
  createFeedback(
    @Param('id', ParseIntPipe) id: string,
    @Param('mealId', ParseIntPipe) mealId: number,
    @Body() createFeedbackDto: CreateFeedbackDto,
  ) {
    return this.patientService.createFeedback(id, mealId, createFeedbackDto);
  }

  // @Get('login')
  // async login(@Body() body: { username: string; password: string }): Promise<{ isAuthenticated: boolean; userType: string }> {
  //   const { username, password } = body;
  //   let isAuthenticated = false;
  //   let userType = '';

  //   // Check if the username is a number (Thai ID), indicating a patient
  //   if (!isNaN(parseInt(username))) {
  //     const result = await this.authService.authenticatePatient(username, password);
  //     isAuthenticated = result.isAuthenticated;
  //     userType = 'patient';
  //   } else {
  //     // const result = await this.authService.authenticateStaff(username, password);
  //     isAuthenticated = false;
  //     userType = 'staff';
  //   }

  //   return { isAuthenticated, userType };
  // }

  @Get('login')
  async login(@Body() userLoginDto: UserLoginDto){
    return await this.authService.authenticatePatient(userLoginDto);
  }
}
