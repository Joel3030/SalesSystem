import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService){}

  @Post('/create')
  async createUser(@Res() res: Response, @Body() req: CreateUserDto) {
        
    const newUser = await this.userService.createUser(req);
    return res.status(HttpStatus.OK).json({
      message : 'User Successfully Created',
      newUser
    })
  }
}
