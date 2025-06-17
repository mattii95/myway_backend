import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async register(registerAuthDto: RegisterAuthDto) {
    const { email, phone } = registerAuthDto;
    const emailExist = await this.userRepository.findOneBy({ email });
    if (emailExist) {
      return new ConflictException('El email ya esta registrado');
    }

    const phoneExist = await this.userRepository.findOneBy({ phone });
    if (phoneExist) {
      return new ConflictException('El número de télefono ya esta registrado');
    }

    const newUser = this.userRepository.create(registerAuthDto);
    const { password, ...user } = await this.userRepository.save(newUser);
    const payload = { id: user.id, name: user.name };
    const token = this.jwtService.sign(payload);
    const data = {
      user,
      token
    }

    return data;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      return new ForbiddenException('Credenciales incorrectas');
    }

    const { password: uPassword, ...rest } = user;
    const isPasswordValid = await compare(password, uPassword);
    if (!isPasswordValid) {
      return new ForbiddenException('Credenciales incorrectas');
    }

    const payload = { id: rest.id, name: rest.name };
    const token = this.jwtService.sign(payload);
    const data = {
      user: rest,
      token
    }
    return data;
  }
}
