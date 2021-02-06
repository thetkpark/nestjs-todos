import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/user.entity'
import { Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { UpdateTodoDto } from './dto/update-todo.dto'
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

	async updateTodo(updateTodo: UpdateTodoDto, user: User): Promise<Todo> {
		const todo = await this.todoRepository.findOne({ where: { id: updateTodo.id, user } })
		if (!todo) throw new BadRequestException('Todo not found')
		todo.title = updateTodo.title ? updateTodo.title : todo.title
		todo.done = updateTodo.done ? updateTodo.done : todo.done
		return this.todoRepository.save(todo)
	}
}
