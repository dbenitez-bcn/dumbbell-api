import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseTableEntity } from './baseTableEntity';
import Secrets from '../../../../../core/secrets';
import UserAccountDB from '../../../../accounts/infrastructure/typeorm/entities/user';

@Entity(Secrets.DB_TB_EXERCISES)
export default class ExerciseDB extends BaseTableEntity{

    @Column('varchar')
    name: string;

    @Column('text')
    description: string;

    @Column('int')
    difficulty: number;

    @ManyToOne(type => UserAccountDB, user => user.exercises)
    created_by: UserAccountDB
}