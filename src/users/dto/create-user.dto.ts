export class CreateUserDto {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
  urlImage?: string;
  notificationToken?: string;
}
