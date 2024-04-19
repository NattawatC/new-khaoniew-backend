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
  Put,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dtos/CreatePatient.dto';
import { UpdatePatientDto } from './dtos/UpdatePatient.dto';
import { CreatePatientMealDto } from './dtos/CreatePatientMeal.dto';
import { CreateFoodDto } from './dtos/CreateFood.dto';
import { UpdateFeedbackDto } from './dtos/UpdateFeedback.dto';

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

  @Get(':thaiId/medicalconditions')
  async getUserMedicalConditions(
    @Param('thaiId') thaiId: string,
  ): Promise<string[]> {
    try {
      return await this.patientService.getMedicalConditions(thaiId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

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

  @Delete(':age')
  async deletePatientByAge(
  @Param('age') age: number){
    await this.patientService.deletePatientByAge(age);
  }

  @Get(':id/meals')
  async getPatientMeals(@Param('id', ParseIntPipe) id: string) {
    return this.patientService.getPatientMeals(id);
  }

  @Get(':id/meals/:mealId')
  async getPatientAMeal(
    @Param('id', ParseIntPipe) id: string,
    @Param('mealId', ParseIntPipe) mealId: number,
  ) {
    return this.patientService.getPatientAMeal(id, mealId);
  }

  // @Post(':id/meals')
  // createMeal(
  //   @Param('id', ParseIntPipe) id: string,
  //   @Body() createMealDetails: CreatePatientMealDto,
  //   @Body('imageId') imageId: number,
  // ) {
  //   return this.patientService.createPatientMeal(id, createMealDetails, imageId);
  // }

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

  // @Get(':id/meals/:mealId/feedbacks/:feedbackId')
  // getFeedback(
  //   @Param('id', ParseIntPipe) id: string,
  //   @Param('mealId', ParseIntPipe) mealId: number,
  //   @Param('feedbackId', ParseIntPipe) feedbackId: number,
  // ) {
  //   return this.patientService.getAFeedbackMeal(mealId, feedbackId);
  // }

  // @Post(':id/meals/:mealId/foods')
  // createFood(
  //   @Param('id', ParseIntPipe) id: string,
  //   @Param('mealId', ParseIntPipe) mealId: number,
  //   @Body() createFoodDto: CreateFoodDto,
  // ) {
  //   return this.patientService.createFood(id, mealId, createFoodDto);
  // }

  @Get(':id/meals/:mealId/feedbacks/:feedbackId')
  getFeedback(
    @Param('id', ParseIntPipe) id: string,
    @Param('mealId', ParseIntPipe) mealId: number,
    @Param('feedbackId', ParseIntPipe) feedbackId: number,
  ) {
    return this.patientService.getFeedback(id, mealId, feedbackId);
  }

  @Put(':id/meals/:mealId/feedbacks')
  updateFeedback(
    @Param('id', ParseIntPipe) id: string,
    @Param('mealId', ParseIntPipe) mealId: number,
    @Body() updateFeedbackDetails: UpdateFeedbackDto,
  ) {
    return this.patientService.updateFeedback(
      id,
      mealId,
      updateFeedbackDetails,
    );
  }
}
