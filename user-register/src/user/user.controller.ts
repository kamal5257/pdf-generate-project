import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('getUsers')
  async getUsers(@Res() response) {
    try {
      const users = await this.userService.getAllUsers();
      console.log('###', users);
      return response.status(HttpStatus.CREATED).json({
        statusCode: 200,
        message: 'API proceed successfully',
        data: users,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        // message: 'Error: User not created!',
        message: err,
        error: 'Bad Request',
      });
    }
  }
  @Post('createUser')
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        // message: 'Error: User not created!',
        message: err,
        error: 'Bad Request',
      });
    }
  }

  @Post('updateUser')
  async updateUser(
    @Res() response,
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const newStudent = await this.userService.updateUser(
        userId,
        updateUserDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been updated successfully',
        newStudent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        // message: 'Error: User not created!',
        message: err,
        error: 'Bad Request',
      });
    }
  }
  @Get('deleteUser/:userId')
  async deleteUser(@Res() response, @Param('userId') userId: string) {
    try {
      console.warn('DELETE_U', userId);
      await this.userService.deleteUser(userId);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been deleted successfully',
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        // message: 'Error: User not created!',
        message: err,
        error: 'Bad Request',
      });
    }
  }
}
