import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseTableEntity {
    constructor(id: number, created_at: string, updated_at: string){
        this.id = id
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}