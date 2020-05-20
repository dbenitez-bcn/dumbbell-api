import { Entity, Column } from 'typeorm';
import { BaseTableEntity } from './baseTableEntity';
import Secrets from '../../../../api/config/secrets';

@Entity(Secrets.DB_TB_EXERCISES)
export default class ExerciseDB extends BaseTableEntity{

    @Column('varchar')
    name: string;

    @Column('text')
    description: string;

    @Column('int')
    difficulty: number;
}