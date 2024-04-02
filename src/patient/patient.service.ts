import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../typeorm/entities/Patient';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dtos/CreatePatient.dto';
import { UpdatePatientDto } from './dtos/UpdatePatient.dto';
import { CreatePatientMealDto } from './dtos/CreatePatientMeal.dto';
import { Meal } from 'src/typeorm/entities/Meal';
import { CreateFoodDto } from './dtos/CreateFood.dto';
import { Food } from 'src/typeorm/entities/Food';
import { CreateFeedbackDto } from './dtos/CreateFeedback.dto';
import { Feedback } from 'src/typeorm/entities/Feedback';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
    @InjectRepository(Food) private foodRepository: Repository<Food>,
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  findPatient() {
    return this.patientRepository.find({ relations: ['meals', 'meals.food', 'meals.feedback']});
  }

  createPatient(patientDetails: CreatePatientDto) {
    const newPatient = this.patientRepository.create(patientDetails);
    return this.patientRepository.save(newPatient);
  }

  updatePatient(id: number, updatePatientDetails: UpdatePatientDto) {
    return this.patientRepository.update({ id }, { ...updatePatientDetails });
  }

  deletePatient(id: number) {
    return this.patientRepository.delete({ id });
  }

  async createPatientMeal(id: number, mealDetails: CreatePatientMealDto) {
    const patient = await this.patientRepository.findOneBy({ id });
    if (!patient) {
      throw new HttpException(
        'Patient not found. Cannot create meal',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newMeal = this.mealRepository.create({
      ...mealDetails,
      date: new Date(),
      patient,
    });
    return this.mealRepository.save(newMeal);
  }

  async deletePatientMeal(id: number, mealId: number) {
    const patient = await this.patientRepository.findOneBy({ id });
    if (!patient) {
      throw new HttpException(
        'Patient not found. Cannot delete meal',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.mealRepository.delete({ id: mealId, patient });
    if (result.affected === 0) {
      throw new HttpException(
        'Meal not found for this patient. Cannot delete meal',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createFood(
    id: number,
    mealId: number,
    createFoodDetails: CreateFoodDto,
  ) {
    const meal = await this.mealRepository.findOneBy({
      id: mealId,
      patient: { id },
    });
    if (!meal) {
      throw new HttpException(
        'Meal not found for this patient. Cannot create food',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newFood = this.foodRepository.create(createFoodDetails);
    const savedFood = await this.foodRepository.save(newFood);

    meal.food = savedFood;
    return this.mealRepository.save(meal);
  }

  async createFeedback(
    id: number,
    mealId: number,
    feedback: CreateFeedbackDto,
  ) {
    const meal = await this.mealRepository.findOneBy({
      id: mealId,
      patient: { id },
    });

    if (!meal) {
      throw new HttpException(
        'Meal not found for this patient. Cannot create feedback',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newFeedback = this.feedbackRepository.create(feedback);
    const savedFeedback = await this.feedbackRepository.save(newFeedback);

    meal.reviewStatus = true;
    meal.feedback = savedFeedback;

    return this.mealRepository.save(meal);
  }
}
