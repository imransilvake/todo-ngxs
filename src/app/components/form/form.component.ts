// angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

// app
import { Todo } from 'src/app/store/models/Todo.model';
import { TodoState } from 'src/app/store/states/todo.state';
import { UpdateTodo, AddTodo, SetSelectedTodo } from 'src/app/store/actions/todo.action';

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
		private fb: FormBuilder,
		private store: Store,
		private route: ActivatedRoute,
		private router: Router
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
						userId: todo.userId,
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
		this.todoForm = this.fb.group({
			id: [''],
			userId: ['', Validators.required],
			title: ['', Validators.required]
		});
	}

	/**
	 * sumbit form
	 */
	onSubmit() {
		if (this.editTodo) {
			this.store
				.dispatch(new UpdateTodo(this.todoForm.value, this.todoForm.value.id))
				.subscribe(() => this.clearForm());
		} else {
			this.store
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
		this.store.dispatch(new SetSelectedTodo(null));
	}
}
