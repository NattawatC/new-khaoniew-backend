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
import { UpdateFeedbackDto } from './dtos/UpdateFeedback.dto';
import { Feedback } from 'src/typeorm/entities/Feedback';
import { MedicalCondition } from 'src/typeorm/entities/MedicalCondition';
import { Image } from 'src/typeorm/entities/Images';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    @InjectRepository(Food) private foodRepository: Repository<Food>,
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(MedicalCondition)
    private readonly medicalConditionRepository: Repository<MedicalCondition>,
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
      let medicalCondition = await this.medicalConditionRepository.findOne({
        where: { name: medicalConditionName },
      });

      // If medical condition doesn't exist, create a new one
      if (!medicalCondition) {
        medicalCondition = this.medicalConditionRepository.create({
          name: medicalConditionName,
        });
        await this.medicalConditionRepository.save(medicalCondition);
      }

      // Add medical condition to the array
      medicalConditions.push(medicalCondition);
    }

    // Create patient entity with associated medical conditions
    const newPatient = this.patientRepository.create({
      ...rest,
      medicalConditions,
    });

    // Save patient entity
    return this.patientRepository.save(newPatient);
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
    return patient.medicalConditions.map((condition) => condition.name);
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

  deletePatientByAge(age: number) {
    return this.patientRepository.delete({ age });
  }

  getPatientMeals(thaiId: string) {
    return this.mealRepository.find({
      where: { patient: { thaiId } },
      relations: ['food', 'feedback'],
    });
  }

  getPatientAMeal(thaiId: string, mealId: number) {
    return this.mealRepository.findOne({
      where: { id: mealId, patient: { thaiId } },
      relations: ['food', 'feedback'],
    });
  }

  // async createPatientMeal(
  //   thaiId: string,
  //   mealDetails: CreatePatientMealDto,
  //   imageId: number,
  // ): Promise<Meal> {
  //   const patient = await this.patientRepository.findOneBy({ thaiId });
  //   if (!patient) {
  //     throw new HttpException(
  //       'Patient not found. Cannot create meal',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   const image = await this.imageRepository.findOne({where: {id:imageId}});
  //   console.log("Image Id: ", imageId)
  //   if (!image) {
  //   throw new HttpException(
  //     'Image not found. Cannot associate with meal',
  //     HttpStatus.BAD_REQUEST,
  //   );
  //   }

  //   // Create meal
  //   const newMeal = this.mealRepository.create({
  //     ...mealDetails,
  //     patient,
  //   });
  //   await this.mealRepository.save(newMeal);
    
  //   const scoreInGrams = parseInt(mealDetails.score);
  //   const score = Math.round(scoreInGrams / 10);

  //   const newFood = this.foodRepository.create({
  //     name: mealDetails.name,
  //     carbs: scoreInGrams,
  //     score: score.toString(),
  //     image: image,
  //   });
  //   await this.foodRepository.save(newFood);
  //   console.log("newfood", newFood)
  //   const newFeedback = this.feedbackRepository.create({
  //     review: 'รอการรีวิว...',
  //     reviewBy: 'ไม่ระบุ',
  //   });
  //   await this.feedbackRepository.save(newFeedback);

  //   newMeal.food = newFood;
  //   newMeal.feedback = newFeedback;
  //   await this.mealRepository.save(newMeal);
  //   console.log("newMeal", newMeal)

  //   return this.mealRepository.findOne({
  //     where: { id: newMeal.id },
  //     relations: ['food', 'feedback'],
  //   });
    
  // }


//////////////////////////////////////////////////

  // async createPatientMeal(
  //   thaiId: string,
  //   mealDetails: CreatePatientMealDto,
  // ): Promise<Meal> {
  //   const patient = await this.patientRepository.findOneBy({ thaiId });
  //   if (!patient) {
  //     throw new HttpException(
  //       'Patient not found. Cannot create meal',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   // Create meal
  //   const newMeal = this.mealRepository.create({
  //     ...mealDetails,
  //     patient,
  //   });
  //   await this.mealRepository.save(newMeal);
    
  //   const scoreInGrams = parseInt(mealDetails.score);
  //   const score = Math.round(scoreInGrams / 10);

  //   const newFood = this.foodRepository.create({
  //     name: mealDetails.name,
  //     carbs: scoreInGrams,
  //     score: score.toString(),
  //   });
  //   await this.foodRepository.save(newFood);

  //   const newFeedback = this.feedbackRepository.create({
  //     review: 'รอการรีวิว...',
  //     reviewBy: 'ไม่ระบุ',
  //   });
  //   await this.feedbackRepository.save(newFeedback);

  //   newMeal.food = newFood;
  //   newMeal.feedback = newFeedback;
  //   await this.mealRepository.save(newMeal);

  //   return this.mealRepository.findOne({
  //     where: { id: newMeal.id },
  //     relations: ['food', 'feedback'],
  //   });
  // }

/////////////////////////////////

  async createPatientMeal(
    thaiId: string,
    mealDetails: CreatePatientMealDto,
    imageId: number,
  ): Promise<Meal> {
    const patient = await this.patientRepository.findOneBy({ thaiId });
    if (!patient) {
      throw new HttpException(
        'Patient not found. Cannot create meal',
        HttpStatus.BAD_REQUEST,
      );
    }

    const image = await this.imageRepository.findOne({where: {id:imageId}});
    if (!image) {
    throw new HttpException(
      'Image not found. Cannot associate with meal',
      HttpStatus.BAD_REQUEST,
    );
    }

    // Create meal
    const newMeal = this.mealRepository.create({
      ...mealDetails,
      patient,
      image: image
    });
    await this.mealRepository.save(newMeal);
    
    const scoreInGrams = parseInt(mealDetails.score);
    const score = Math.round(scoreInGrams / 10);

    const newFood = this.foodRepository.create({
      name: mealDetails.name,
      carbs: scoreInGrams,
      score: score.toString(),
    });
    await this.foodRepository.save(newFood);

    const newFeedback = this.feedbackRepository.create({
      review: 'รอการรีวิว...',
      reviewBy: 'ไม่ระบุ',
    });
    await this.feedbackRepository.save(newFeedback);

    newMeal.food = newFood;
    newMeal.feedback = newFeedback;
    await this.mealRepository.save(newMeal);

    console.log("new meal",newMeal)
    console.log("image Id:" ,imageId)

    return this.mealRepository.findOne({
      where: { id: newMeal.id },
      relations: ['food', 'feedback', 'image'],
    });
  }

///////////////////////////////////////

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

  async getFeedback(thaiId: string, mealId: number, feedbackId: number) {
    const meal = await this.getPatientAMeal(thaiId, mealId);
    if (!meal) {
      throw new HttpException(
        'Meal not found for this patient',
        HttpStatus.NOT_FOUND,
      );
    }

    const feedback = await this.feedbackRepository.findOneBy({
      id: feedbackId,
    });

    return feedback;
  }

  // async createFood(
  //   thaiId: string,
  //   mealId: number,
  //   createFoodDetails: CreateFoodDto,
  // ) {
  //   const meal = await this.mealRepository.findOneBy({
  //     id: mealId,
  //     patient: { thaiId },
  //   });
  //   if (!meal) {
  //     throw new HttpException(
  //       'Meal not found for this patient. Cannot create food',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   const newFood = this.foodRepository.create(createFoodDetails);
  //   const savedFood = await this.foodRepository.save(newFood);

  //   meal.food = savedFood;
  //   return this.mealRepository.save(meal);
  // }

//   async updateFeedback(
//     thaiId: string,
//     mealId: number,
//     feedback: UpdateFeedbackDto,
// ) {
//     const meal = await this.getPatientAMeal(thaiId, mealId);
//     if (!meal) {
//         throw new HttpException(
//             'Meal not found for this patient',
//             HttpStatus.NOT_FOUND,
//         );
//     }

//     // Update review, score, and reviewBy fields of the meal's feedback
//     meal.feedback.review = feedback.review;
//     meal.feedback.score = feedback.score;
//     meal.feedback.reviewBy = feedback.reviewBy;

//     // Optionally, update reviewStatus
//     meal.reviewStatus = true;

//     // Update the food's score directly
//     meal.food.score = feedback.score;

//     // Save the updated entities
//     await this.mealRepository.save(meal);

//     // Optionally, save the associated food entity
//     await this.foodRepository.save(meal.food);
// }


  async updateFeedback(
    thaiId: string,
    mealId: number,
    feedback: UpdateFeedbackDto,
  ) {
    const meal = await this.getPatientAMeal(thaiId, mealId);
    if (!meal) {
      throw new HttpException(
        'Meal not found for this patient',
        HttpStatus.NOT_FOUND,
      );
    }
    const feedbackToUpdate = meal.feedback;

    feedbackToUpdate.review = feedback.review;
    feedbackToUpdate.reviewBy = feedback.reviewBy;
    feedbackToUpdate.score = feedback.score;
    meal.food.score = feedback.score
  
    await this.feedbackRepository.save(feedbackToUpdate);
    await this.foodRepository.save(meal.food);
  
    meal.reviewStatus = true;
    return this.mealRepository.save(meal);
  }
}
