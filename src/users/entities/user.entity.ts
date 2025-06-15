import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 150
  })
  name: string;

  @Column('varchar', {
    length: 150
  })
  surname: string;

  @Column('varchar', {
    unique: true,
    length: 50,
  })
  phone: string;

  @Column('varchar', {
    unique: true,
    length: 250
  })
  email: string;

  @Column('text', {
    nullable: true,
  })
  urlImage: string;

  @Column('varchar', {
    length: 150,
  })
  password: string;

  @Column('text', {
    nullable: true,
  })
  notificationToken: string;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;
}
