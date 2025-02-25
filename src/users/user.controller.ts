import { Controller, Get, UseGuards, Request, Post, Body, Param, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { Roles } from '../auth/roles/roles.decorator';
import { UserRole } from './user.entity';
import { RolesGuard } from '../auth/roles/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req: any) {
    return req.user; 
  }
  
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard) 
  async findAll() {
    return this.userService.findAll();
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  } 
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(id, updateUserDto);
  }
}
