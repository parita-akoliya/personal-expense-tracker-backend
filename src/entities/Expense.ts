import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category';

/**
 * Entity representing an expense made by a user.
 */
@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column()
  description!: string;

  @Column('date')
  date!: Date;

  @ManyToOne(() => Category, (category) => category.expenses, { nullable: true })
  category!: Category | null;
}