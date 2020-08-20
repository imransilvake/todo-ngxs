// angular
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// app
import { NgxsModule, Store } from '@ngxs/store';
import { TodoState } from 'src/app/todo/store/states/todo.state';
import { GetTodos } from 'src/app/todo/store/actions/todo.action';
import { TodoService } from 'src/app/todo/services/todo.service';
import { ListComponent } from './list.component';

describe('List Component', () => {
	let todoService: TodoService
	let store: Store;
	let component: ListComponent;
	let fixture: ComponentFixture<ListComponent>;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				NgxsModule.forRoot([
					TodoState
				])
			],
			declarations: [
				ListComponent
			]
		}).compileComponents();
	});

	beforeEach(() => {
		// spy fetchTodos from TodoService to get mock data
		todoService = TestBed.inject(TodoService);
		spyOn(todoService, 'fetchTodos')
			.and.returnValue(
				of(
					[
						{ id: 1, title: 'One' },
						{ id: 2, title: 'Two' },
						{ id: 3, title: 'Three' },
						{ id: 4, title: 'Four' }
					]
				)
			);

		// inject store
		store = TestBed.inject(Store);
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ListComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should have List Component', () => {
		expect(component).toBeDefined();
	});

	it('should have been called "fetchTodos"', () => {
		expect(todoService.fetchTodos).toHaveBeenCalled();
	});

	it('should have todos list', () => {
		store.dispatch(new GetTodos());
		const todos = store.selectSnapshot(state => state.TodoState.todos);

		// expect
		expect(todos.length).toBe(4);
	});
});
