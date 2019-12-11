// @ts-ignore
import { IsEmail, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "libs/orm";

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  password: string;

  @MaxLength(20)
  @Column()
  firstName: string;

  @MaxLength(201)
  @Column()
  lastName: string;
}
