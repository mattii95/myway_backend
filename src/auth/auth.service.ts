import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { In, Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) { }

  async register(registerAuthDto: RegisterAuthDto) {
    const { email, phone, rolesTypes } = registerAuthDto;

    const emailExist = await this.userRepository.findOneBy({ email });
    if (emailExist) {
      throw new ConflictException('El email ya esta registrado');
    }

    const phoneExist = await this.userRepository.findOneBy({ phone });
    if (phoneExist) {
      throw new ConflictException('El número de télefono ya esta registrado');
    }

    const roles = await this.roleRepository.findBy({ type: In(rolesTypes) });

    const newUser = this.userRepository.create({ ...registerAuthDto, roles });
    const { password, ...user } = await this.userRepository.save(newUser);

    const payload = { id: user.id, name: user.name, roles: rolesTypes };
    const token = this.jwtService.sign(payload);

    return {
      user,
      token
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles']
    });

    if (!user) {
      throw new ForbiddenException('Credenciales incorrectas');
    }

    const { password: uPassword, ...rest } = user;
    const isPasswordValid = await compare(password, uPassword);
    if (!isPasswordValid) {
      throw new ForbiddenException('Credenciales incorrectas');
    }

    const rolesTypes = rest.roles.map(rol => rol.type);

    const payload = { id: rest.id, name: rest.name, roles: rolesTypes };
    const token = this.jwtService.sign(payload);

    return {
      user: rest,
      token
    };
  }
}
