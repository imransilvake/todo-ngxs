// angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// app
import { Todo } from './store/models/Todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
	constructor(private http: HttpClient) {
	}

	/**
	 * fetch todos
	 */
	fetchTodos() {
		return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
	}

	/**
	 * add todo
	 * @param payload
	 */
	addTodo(payload: Todo) {
		return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', payload);
	}

	/**
	 * update todo
	 * @param payload
	 * @param id 
	 */
	updateTodo(payload: Todo, id: number) {
		console.log(id);
		return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, payload);
	}

	/**
	 * delete todo
	 * @param id
	 */
	deleteTodo(id: number) {
		return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
	}
}
