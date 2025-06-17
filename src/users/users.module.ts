import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UploadImageModule } from 'src/upload-image/upload-image.module';
import { RolesModule } from 'src/roles/roles.module';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UploadImageModule,
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [TypeOrmModule]
})
export class UsersModule { }
