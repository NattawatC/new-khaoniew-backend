import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../typeorm/entities/Patient';
import { FindOneOptions, Repository, Transaction } from 'typeorm';
import { CreatePatientDto } from './dtos/CreatePatient.dto';
import { UpdatePatientDto } from './dtos/UpdatePatient.dto';
import { CreatePatientMealDto } from './dtos/CreatePatientMeal.dto';
import { Meal } from 'src/typeorm/entities/Meal';
import { CreateFoodDto } from './dtos/CreateFood.dto';
import { Food } from 'src/typeorm/entities/Food';
import { CreateFeedbackDto } from './dtos/CreateFeedback.dto';
import { Feedback } from 'src/typeorm/entities/Feedback';
import { MedicalCondition } from 'src/typeorm/entities/MedicalCondition';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
    @InjectRepository(Food) private foodRepository: Repository<Food>,
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(MedicalCondition)
    private readonly medicalConditionRepository: Repository<MedicalCondition>
  ) {}

  async findByThaiId(thaiId: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { thaiId },
      relations: ['meals', 'meals.food', 'meals.feedback'],
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  findPatient() {
    return this.patientRepository.find({
      relations: ['meals', 'meals.food', 'meals.feedback'],
    });
  }

  async createPatient(patientDetails: CreatePatientDto) {
    const { medicalCondition: medicalConditionNames, ...rest } = patientDetails;

    // Create an array to hold medical condition entities
    const medicalConditions: MedicalCondition[] = [];

    // Iterate over medical condition names
    for (const medicalConditionName of medicalConditionNames) {
        // Check if medical condition with given name already exists
        let medicalCondition = await this.medicalConditionRepository.findOne({ where: { name: medicalConditionName } });

        // If medical condition doesn't exist, create a new one
        if (!medicalCondition) {
            medicalCondition = this.medicalConditionRepository.create({ name: medicalConditionName });
            await this.medicalConditionRepository.save(medicalCondition);
        }

        // Add medical condition to the array
        medicalConditions.push(medicalCondition);
    }

    // Create patient entity with associated medical conditions
    const newPatient = this.patientRepository.create({ ...rest, medicalConditions });

    // Save patient entity
    return this.patientRepository.save(newPatient);
}


  updatePatient(thaiId: string, updatePatientDetails: UpdatePatientDto) {
    return this.patientRepository.update(
      { thaiId },
      { ...updatePatientDetails },
    );
  }

  deletePatient(thaiId: string) {
    return this.patientRepository.delete({ thaiId });
  }

  getPatientMeals(thaiId: string) {
    return this.mealRepository.find({
      where: { patient: { thaiId } },
      relations: ['food', 'feedback'],
    });
  }

  async createPatientMeal(
    thaiId: string,
    mealDetails: CreatePatientMealDto,
  ): Promise<Meal> {
    const patient = await this.patientRepository.findOneBy({ thaiId });
    if (!patient) {
      throw new HttpException(
        'Patient not found. Cannot create meal',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Create meal
    const newMeal = this.mealRepository.create({
      ...mealDetails,
      date: new Date(),
      patient,
    });
    await this.mealRepository.save(newMeal);

    const newFood = this.foodRepository.create({
      name: mealDetails.name,
    });
    await this.foodRepository.save(newFood);

    newMeal.food = newFood;

    await this.mealRepository.save(newMeal);

    return this.mealRepository.findOne({
      where: { id: newMeal.id },
      relations: ['food', 'feedback'],
    });
  }

  async deletePatientMeal(thaiId: string, mealId: number) {
    const patient = await this.patientRepository.findOneBy({ thaiId });
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
    thaiId: string,
    mealId: number,
    createFoodDetails: CreateFoodDto,
  ) {
    const meal = await this.mealRepository.findOneBy({
      id: mealId,
      patient: { thaiId },
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
    thaiId: string,
    mealId: number,
    feedback: CreateFeedbackDto,
  ) {
    const meal = await this.mealRepository.findOneBy({
      id: mealId,
      patient: { thaiId },
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

  async getMedicalConditions(thaiId: string): Promise<string[]> {
    // Find patient by Thai ID and load medical conditions
    const patient = await this.patientRepository.findOne({
      where: { thaiId },
      relations: ['medicalConditions'],
    });
    if (!patient) {
      throw new Error(`User with Thai ID ${thaiId} not found`);
    }
    // Extract and return names of medical conditions
    return patient.medicalConditions.map(condition => condition.name);
  }
}
