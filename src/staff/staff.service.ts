import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/typeorm/entities/Staff';
import { Repository } from 'typeorm';
import { CreateStaffDto } from './dto/CreateStaff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff) private staffRepository: Repository<Staff>,
  ) {}

  findStaff() {
    return this.staffRepository.find();
  }

  async findByFullName(fullName: string): Promise<Staff> {
    const staff = await this.staffRepository.findOne({ where: { fullName }});

    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    return staff;
  }

  createStaff(staffDetails: CreateStaffDto) {
    const newPatient = this.staffRepository.create(staffDetails);
    return this.staffRepository.save(newPatient);
  }
}
