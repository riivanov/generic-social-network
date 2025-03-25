import { IUser } from "@lib/models/user.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements IUser {
  // @ts-ignore
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // @ts-ignore
  @Column()
  password: string;

  // @ts-ignore
  @Column({ unique: true })
  email: string;

  // @ts-ignore
  @Column({ unique: true })
  username: string;
}
