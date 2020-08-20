// angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

// app
import { Select, Store } from '@ngxs/store';
import { TodoState } from 'src/app/todo/store/states/todo.state';
import { Todo } from 'src/app/todo/store/models/todo.model';
import { GetTodos, SetSelectedTodo, DeleteTodo } from 'src/app/todo/store/actions/todo.action';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {
	@Select(TodoState.getTodoList) todos: Observable<Todo[]>;

	constructor(private store: Store) {
	}

	ngOnInit() {
		// get todos
		this.store.dispatch(new GetTodos());
	}

	ngOnDestroy() {
		// rest selected todo
		this.store.dispatch(new SetSelectedTodo(null));
	}

	/**
	 * 
	 * @param id delete todo
	 */
	deleteTodo(id: number) {
		this.store.dispatch(new DeleteTodo(id));
	}

	/**
	 * delete todo
	 * @param payload
	 */
	editTodo(payload: Todo) {
		this.store.dispatch(new SetSelectedTodo(payload));
	}
}
