import { Entity, Column } from 'typeorm';
import { BaseTableEntity } from './baseTableEntity';

@Entity(process.env.DB_TB_EXERCISES)
export default class ExerciseDB extends BaseTableEntity{

    @Column('varchar')
    name: string;

    @Column('text')
    description: string;

    @Column('int')
    difficulty: number;
}