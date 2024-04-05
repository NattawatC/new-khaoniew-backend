import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../../dto/CreateUser.dto';
import { FindOneOptions, Repository } from 'typeorm';
// import { User } from 'src/user/typeorm/entities/User';
import {User} from 'src/user/typeorm/entities/User'
import { MedicalCondition } from 'src/typeorm/entities/MedicalCondition';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(MedicalCondition)
    private medicalConditionRepository: Repository<MedicalCondition>,
  ) {}

  //Create a new user with medical conditions handling
  async createUser(userData: any): Promise<User> {
    const {
      thaiId,
      firstname,
      lastname,
      age,
      password,
      medicalconditions,
    } = userData;

    let user = new User();
    user.thaiId = thaiId;
    user.firstname = firstname;
    user.lastname = lastname;
    user.age = age;
    user.password = password;

    // Check if medical conditions are provided
    if (medicalconditions && medicalconditions.length > 0) {
      // Find or create medical conditions
      const medicalConditionEntities = await Promise.all(
        medicalconditions.map(async (conditionName: string) => {
            let medicalCondition = await this.medicalConditionRepository.findOne({ where: { name: conditionName } } as FindOneOptions<MedicalCondition>);

          if (!medicalCondition) {
            medicalCondition = new MedicalCondition();
            medicalCondition.name = conditionName;
            medicalCondition = await this.medicalConditionRepository.save(medicalCondition);
          }

          return medicalCondition;
        }),
      );

      // Assign medical conditions to user
      user.medicalconditions = medicalConditionEntities;
    }
    return this.userRepository.save(user);
  }

  //getting medical conditions by ThaiId
  async getMedicalConditionsOfUser(thaiId: string): Promise<string[]> {
    // Find the user by their Thai ID and eager load their medical conditions
    const user = await this.userRepository.findOne({
      where: { thaiId },
      relations: ['medicalconditions'],
    });

    if (!user) {
      throw new Error(`User with Thai ID ${thaiId} not found`);
    }

    // Extract and return the names of medical conditions
    return user.medicalconditions.map(condition => condition.name);
  }

  

}