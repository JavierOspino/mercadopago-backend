import { Controller, Get, UseGuards, Request, Post, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  [x: string]: any;
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req: any) {
    return req.user; 
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get()
  @UseGuards(AuthGuard('jwt')) 
  async findAll() {
    return this.userService.findAll();
  }
}
