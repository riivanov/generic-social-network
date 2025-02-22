import { IUser } from "@lib/models/user.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements IUser {
  // @ts-ignore
  @PrimaryGeneratedColumn()
  id: number;

  // @ts-ignore
  @Column()
  email: string;

  // @ts-ignore
  @Column()
  password: string;

  // @ts-ignore
  @Column()
  username: string;
}
