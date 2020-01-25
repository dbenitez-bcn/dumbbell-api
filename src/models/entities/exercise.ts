import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Exercise {
    constructor (id: number, created_at: string, updated_at: string, name: string, description: string, difficulty: number) {
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
    }
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column('varchar')
    name: string;

    @Column('text')
    description: string;

    @Column('int')
    difficulty: number;
}