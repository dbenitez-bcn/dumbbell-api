import { Entity, Unique, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity(process.env.DB_TB_USERS)
@Unique(['username', 'email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar')
    username!: string;

    @Column('varchar')
    email!: string;

    @Column('varchar')
    password!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}