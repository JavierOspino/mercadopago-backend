import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService, private readonly userService: UserService) {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get<string>('JWT_SECRET') as string,
        });
    }
    
    async validate(payload: { sub: string }): Promise<User> {
        console.log('Payload recibido:', payload); // 👈 Verifica que `id` es un string
        const user = await this.userService.findById(payload.sub);
        console.log('Usuario encontrado:', user);
      
        if (!user) {
          throw new UnauthorizedException('Usuario no encontrado');
        }
      
        return user;
      }
}
