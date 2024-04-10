import { Controller } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateStaffDto } from './dto/CreateStaff.dto';

@Controller('staffs')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  async getStaff() {
    const patients = await this.staffService.findStaff();
    return patients;
  }

  @Get(':fullName')
  async findByFullName(@Param('fullName') fullName: string) {
    return this.staffService.findByFullName(fullName);
  }

  @Post()
  createStaff(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.createStaff(createStaffDto);
  }

  @Delete(':id')
  deleteStaff(@Param('id') id: string) {
    return this.staffService.deleteStaff(id);
  }
}
