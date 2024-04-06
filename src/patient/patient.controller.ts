import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ParseIntPipe,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dtos/CreatePatient.dto';
import { UpdatePatientDto } from './dtos/UpdatePatient.dto';
import { CreatePatientMealDto } from './dtos/CreatePatientMeal.dto';
import { CreateFoodDto } from './dtos/CreateFood.dto';
import { CreateFeedbackDto } from './dtos/CreateFeedback.dto';

@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Get(':thaiId')
  async findByThaiId(@Param('thaiId') thaiId: string) {
    return this.patientService.findByThaiId(thaiId);
  }

  @Get()
  async getPatient() {
    const patients = await this.patientService.findPatient();
    return patients;
  }

  // @Get(':thaiId/medicalconditions')
  //   async getUserMedicalConditions(@Param('thaiId') thaiId: string): Promise<string[]> {
  //     try {
  //       return await this.patientService.getMedicalConditions(thaiId);
  //     } catch (error) {
  //       throw new NotFoundException(error.message);
  //     }
  //   }

  @Post()
  createPatient(@Body() createPatientDto: CreatePatientDto) {
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

  @Get(':id/meals')
  async getPatientMeals(@Param('id', ParseIntPipe) id: string) {
    return this.patientService.getPatientMeals(id);
  }

  @Post(':thaiId/meals')
  createMeal(
    @Param('thaiId', ParseIntPipe) ThaiId: string,
    @Body() createMealDetails: CreatePatientMealDto,
  ) {
    return this.patientService.createPatientMeal(ThaiId, createMealDetails);
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
}
