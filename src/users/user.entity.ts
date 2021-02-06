import { Todo } from 'src/todo/todo.entity'
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	username: string

	@Column()
	password: string

	@CreateDateColumn()
	createAt: Date

	@UpdateDateColumn()
	updateAt: Date

	@OneToMany(() => Todo, Todo => Todo.user)
	todos: Todo[]
}
