import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'roles'})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 100,
    unique: true,
  })
  name: string;
  
  @Column('varchar', {
    length: 100,
    unique: true,
  })
  type: string;

  @Column('varchar', {
    length: 255
  })
  imageUrl: string;

  @Column('varchar', {
    length: 255
  })
  route: string;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  @ManyToMany(
    () => User,
    (user) => user.roles
  )
  users: User[];

}
