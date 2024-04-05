import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/staff/typeorm/entity/Staff';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,
    ) {}
    
    async createStaff(fullname: string, password: string): Promise<Staff> {
        const staff = this.staffRepository.create({ fullname, password });
        return this.staffRepository.save(staff);
    }
}
