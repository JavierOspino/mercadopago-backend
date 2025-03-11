import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/services/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await this.userService.validatePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return user;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    // validateUser SIEMPRE retorna un usuario válido o lanza error
    const user = await this.validateUser(email, password);

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async logout() {
    
  }
}
