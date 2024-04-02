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

@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

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
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    await this.patientService.updatePatient(id, updatePatientDto);
  }

  @Delete(':id')
  async deletePatientById(@Param('id', ParseIntPipe) id: number) {
    await this.patientService.deletePatient(id);
  }

  @Post(':id/meals')
  createMeal(
    @Param('id', ParseIntPipe) id: number,
    @Body() createMealDetails: CreatePatientMealDto,
  ) {
    return this.patientService.createPatientMeal(id, createMealDetails);
  }

  @Delete(':id/meals/:mealId')
  deleteMeal(
    @Param('id', ParseIntPipe) id: number,
    @Param('mealId', ParseIntPipe) mealId: number,
  ) {
    return this.patientService.deletePatientMeal(id, mealId);
  }

  @Post(':id/meals/:mealId/foods')
  createFood(
    @Param('id', ParseIntPipe) id: number,
    @Param('mealId', ParseIntPipe) mealId: number,
    @Body() createFoodDto: CreateFoodDto,
  ) {
    return this.patientService.createFood(id, mealId, createFoodDto);
  }

  @Post(':id/meals/:mealId/feedbacks')
  createFeedback(
    @Param('id', ParseIntPipe) id: number,
    @Param('mealId', ParseIntPipe) mealId: number,
    @Body() createFeedbackDto: CreateFeedbackDto,
  ) {
    return this.patientService.createFeedback(id, mealId, createFeedbackDto);
  }
}
