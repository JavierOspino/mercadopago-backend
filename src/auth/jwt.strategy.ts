import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/services/user.service';

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
        console.log('Payload recibido:', payload);
        console.log(payload.sub);
        const user = await this.userService.findById(payload.sub);
        console.log('Usuario encontrado:', user);
      
        if (!user) {
          throw new UnauthorizedException('Usuario no encontrado');
        }
      
        return user;
      }
}
