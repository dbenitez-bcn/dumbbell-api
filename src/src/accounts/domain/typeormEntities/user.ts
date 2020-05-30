import { Entity, Unique, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import Secrets from "../../../../core/secrets";
import UserRole from "../valueObjects/userRole";
import ExerciseDB from "../../../exercises/domain/typeormEntities/exercise";

@Entity(Secrets.DB_TB_USERS)
@Unique(['email'])
@Unique(['username'])
export default class UserDB {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    username: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole

    @OneToMany(type => ExerciseDB, exercise => exercise.created_by)
    exercises: ExerciseDB[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}