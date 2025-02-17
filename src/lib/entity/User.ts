import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  // @ts-ignore
  @PrimaryGeneratedColumn()
  id: number;

  // @ts-ignore
  @Column()
  email: string;

  // @ts-ignore
  @Column()
  username: string;

  // @ts-ignore
  @Column()
  password: string;
}
