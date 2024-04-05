import { Body, Controller, Get, NotFoundException, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/CreateUser.dto';
import { UserService } from 'src/user/service/user/user.service';


@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    DoSome(){
        return "...";
    }

    @Get(':thaiId/medicalconditions')
    async getUserMedicalConditions(@Param('thaiId') thaiId: string): Promise<string[]> {
      try {
        return await this.userService.getMedicalConditionsOfUser(thaiId);
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body() userData: CreateUserDto){
        console.log(userData);
        return this.userService.createUser(userData);
    }
}
