// angular
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// app
import { NgxsModule, Store } from '@ngxs/store';
import { TodoState } from 'src/app/todo/store/states/todo.state';
import { GetTodos } from 'src/app/todo/store/actions/todo.action';
import { TodoService } from 'src/app/todo/services/todo.service';

describe('List Component', () => {
	let todoService: TodoService
	let store: Store;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				NgxsModule.forRoot([
					TodoState
				])
			]
		}).compileComponents();
	});

	beforeEach(() => {
		// spy fetchTodos from TodoService to get mock data
		todoService = TestBed.inject(TodoService);
		spyOn(todoService, 'fetchTodos').and.returnValue(of(
			[
				{ id: 1, title: 'One' },
				{ id: 2, title: 'Two' },
				{ id: 3, title: 'Three' },
				{ id: 4, title: 'Four' }
			]
		));

		// inject store
		store = TestBed.inject(Store);
	});

	it('should have todos list', () => {
		store.dispatch(new GetTodos());
		const todos = store.selectSnapshot(state => state.TodoState.todos);

		// expect
		expect(todos.length).toBe(4);
	});
});
