// angular
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

// app
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { Todo } from '../models/Todo.model';
import { GetTodos, AddTodo, UpdateTodo, DeleteTodo, SetSelectedTodo } from '../actions/todo.action';
import { TodoService } from '../../services/todo.service';

// State Model
export class TodoStateModel {
	todos: Todo[];
	selectedTodo: Todo;
}

// State
@State<TodoStateModel>({
	name: 'TodoState',
	defaults: {
		todos: [],
		selectedTodo: null
	}
})

@Injectable()
export class TodoState {
	constructor(private todoService: TodoService) {
	}

	@Selector()
	static getTodoList(state: TodoStateModel) {
		return state.todos;
	}

	@Selector()
	static getSelectedTodo(state: TodoStateModel) {
		return state.selectedTodo;
	}

	@Action(GetTodos)
	getTodos({ getState, setState }: StateContext<TodoStateModel>) {
		return this.todoService.fetchTodos().pipe(tap((result) => {
			const state = getState();
			setState({
				...state,
				todos: result,
			});
		}));
	}

	@Action(AddTodo)
	addTodo({ getState, patchState }: StateContext<TodoStateModel>, { payload }: AddTodo) {
		return this.todoService.addTodo(payload).pipe(tap((result) => {
			const state = getState();
			patchState({
				todos: [result, ...state.todos]
			});
		}));
	}

	@Action(UpdateTodo)
	updateTodo({ getState, setState }: StateContext<TodoStateModel>, { payload, id }: UpdateTodo) {
		return this.todoService.updateTodo(payload, id).pipe(tap((result) => {
			const state = getState();
			const todoList = [...state.todos];
			const todoIndex = todoList.findIndex(item => item.id === id);
			todoList[todoIndex] = result;
			setState({
				...state,
				todos: todoList,
			});
		}));
	}

	@Action(DeleteTodo)
	deleteTodo({ getState, setState }: StateContext<TodoStateModel>, { id }: DeleteTodo) {
		return this.todoService.deleteTodo(id).pipe(tap(() => {
			const state = getState();
			const filteredArray = state.todos.filter(item => item.id !== id);
			setState({
				...state,
				todos: filteredArray,
			});
		}));
	}

	@Action(SetSelectedTodo)
	setSelectedTodoId({ getState, setState }: StateContext<TodoStateModel>, { payload }: SetSelectedTodo) {
		const state = getState();
		setState({
			...state,
			selectedTodo: payload
		});
	}
}