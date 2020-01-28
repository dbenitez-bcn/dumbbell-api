import { Entity, Column } from 'typeorm';
import { BaseTableEntity } from './baseTableEntity';

@Entity(process.env.DB_TB_EXERCISES)
export class Exercise extends BaseTableEntity{
    constructor (id: number, created_at: string, updated_at: string, name: string, description: string, difficulty: number) {
        super(id, created_at, updated_at)
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
    }

    @Column('varchar')
    name: string;

    @Column('text')
    description: string;

    @Column('int')
    difficulty: number;
}