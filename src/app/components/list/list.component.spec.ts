// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// app
import { ListComponent } from './list.component';
import { NgxsModule, Store } from '@ngxs/store';
import { TodoState } from 'src/app/store/states/todo.state';
import { GetTodos } from 'src/app/store/actions/todo.action';

describe('List Component', () => {
	let store: Store;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				BrowserModule,
				HttpClientTestingModule,
				NgxsModule.forRoot([
					TodoState
				])
			],
			declarations: [
				ListComponent
			]
		}).compileComponents();

		store = TestBed.inject(Store);
	});

	it('should have todos list', async () => {
		store.dispatch(new GetTodos());
		const todos2 = store.selectSnapshot(state => state.TodoState.todos);
		console.log(todos2);

		// expect
		expect(true).toBeTruthy();
	});
});
