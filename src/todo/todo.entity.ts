import { User } from 'src/users/user.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Todo {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	title: string

	@Column({ default: false })
	done: boolean

	@CreateDateColumn()
	createAt: Date

	@UpdateDateColumn()
	updateAt: Date

	@ManyToOne(() => User, User => User.todos)
	user: User
}
