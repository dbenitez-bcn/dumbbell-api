import { Entity, Unique, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import Secrets from "../../../../../core/secrets";
import UserRole from "../../../domain/valueObject/userRole";

@Entity(Secrets.DB_TB_EXERCISE_USERS)
@Unique(['username'])
export default class UserDB {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    username: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}