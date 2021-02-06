import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/user.entity'
import { Repository } from 'typeorm'
import { Todo } from './todo.entity'

@Injectable()
export class TodoService {
	constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>) {}

	async createTodo(title: string, user: User): Promise<Todo> {
		const todo = new Todo()
		todo.title = title
		todo.user = user
		return this.todoRepository.save(todo)
	}

	async getAllTodos(user: User): Promise<Todo[]> {
		return this.todoRepository.find({ where: { user: user } })
	}
}
