import { Body, Controller, Get, Patch, Post, Request, UseGuards, Delete } from '@nestjs/common'
import { Request as expressRequest } from 'express'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateTodoDto } from './dto/create-todo.dto'
import { DeleteTodoDto } from './dto/delete-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
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
		return this.todoService.createTodo(createTodo.title, req.user)
	}

	@Patch()
	@UseGuards(JwtAuthGuard)
	updateTodo(@Request() req, @Body() updateTodo: UpdateTodoDto) {
		return this.todoService.updateTodo(updateTodo, req.user)
	}

	@Delete()
	@UseGuards(JwtAuthGuard)
	deleteTodo(@Request() req, @Body() deleteTodo: DeleteTodoDto) {
		return this.todoService.deleteTodo(deleteTodo, req.user)
	}
}
