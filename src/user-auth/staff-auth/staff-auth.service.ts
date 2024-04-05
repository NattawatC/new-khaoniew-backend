import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/staff/typeorm/entity/Staff';
import { Repository } from 'typeorm';

@Injectable()
export class StaffAuthService {
    constructor(
        @InjectRepository(Staff)
        private readonly staffRepository: Repository<Staff>,
      ) {}

    
}
