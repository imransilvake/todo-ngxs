// angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

// app
import { Todo } from 'src/app/todo/store/models/Todo.model';
import { TodoState } from 'src/app/todo/store/states/todo.state';
import { UpdateTodo, AddTodo, SetSelectedTodo } from 'src/app/todo/store/actions/todo.action';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
	@Select(TodoState.getSelectedTodo) selectedTodo: Observable<Todo>;

	public todoForm: FormGroup;
	public editTodo = false;

	constructor(
		private _fb: FormBuilder,
		private _store: Store
	) {
		// create form
		this.createForm();
	}

	ngOnInit() {
		// listener: selectedTodo from TodoState
		this.selectedTodo
			.subscribe(todo => {
				if (todo) {
					this.todoForm.patchValue({
						id: todo.id,
						title: todo.title
					});
					this.editTodo = true;
				} else {
					this.editTodo = false;
				}
			});
	}

	/**
	 * create form
	 */
	createForm() {
		this.todoForm = this._fb.group({
			id: [0],
			title: ['', Validators.required]
		});
	}

	/**
	 * sumbit form
	 */
	onSubmit() {		
		if (this.editTodo) {
			this._store
				.dispatch(new UpdateTodo(this.todoForm.value, this.todoForm.value.id))
				.subscribe(() => this.clearForm());
		} else {
			this._store
				.dispatch(new AddTodo(this.todoForm.value))
				.subscribe(() => this.clearForm());
		}
	}

	/**
	 * reset form
	 */
	clearForm() {
		// reset
		this.todoForm.reset();

		// reset state property
		this._store.dispatch(new SetSelectedTodo(null));
	}
}
