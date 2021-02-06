import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { Request as expressRequest } from 'express'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateTodoDto } from './dto/create-todo.dto'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
	constructor(private todoService: TodoService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	getAllTodos(@Request() req) {
		return this.todoService.getAllTodos(req.user)
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	createTodo(@Request() req, @Body() createTodo: CreateTodoDto) {
		console.log(req.user)
		return this.todoService.createTodo(createTodo.title, req.user)
	}
}
