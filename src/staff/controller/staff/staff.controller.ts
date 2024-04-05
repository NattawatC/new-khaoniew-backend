import { Body, Controller, Put } from '@nestjs/common';
import { StaffService } from 'src/staff/service/staff/staff.service';
import { Staff } from 'src/staff/typeorm/entity/Staff';

@Controller('staff')
export class StaffController {
    constructor(private staffService: StaffService) {}

    @Put()
    async createStaff(@Body() body: { fullname: string; password: string }): Promise<Staff> {
      const { fullname, password } = body;
      return this.staffService.createStaff(fullname, password);
    }
}
