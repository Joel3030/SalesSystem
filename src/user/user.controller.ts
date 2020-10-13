import {
  Controller,
  UseGuards,
  Get,
  Body,
  Res,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(@Res() res: Response) {
    const users = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('/:id')
  async getUser(@Res() res: Response, @Param('id') id: string) {
    const user = await this.userService.getUser(id);
    return res.status(HttpStatus.OK).json(user);
  }
  @Post('/create')
  async createUser(@Res() res: Response, @Body() req: CreateUserDto) {
    const newUser = await this.userService.createUser(req);
    return res.status(HttpStatus.CREATED).json(newUser);
  }

  @Put('/update/:id')
  async updateUser(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() req: CreateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(id, req);
    return res.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete('/delete/:id')
  async deleteUser(@Res() res: Response, @Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser(id);
    return res.status(HttpStatus.OK).json(deletedUser);
  }
}
