// angular
import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// app
import { NgxsModule } from '@ngxs/store';
import { TodoState } from './todo/store/states/todo.state';
import { AppComponent } from './app.component';
import { FormComponent } from './todo/components/form/form.component';
import { ListComponent } from './todo/components/list/list.component';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule,
				HttpClientTestingModule,
                NgxsModule.forRoot([
					TodoState
				])
			],
			declarations: [
				AppComponent,
				ListComponent,
				FormComponent
			],
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'Todo App using NGXS'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('Todo App using NGXS');
	});

	it('should contain a text: NGXS', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		expect(compiled.querySelector('.container h1').textContent).toContain('NGXS');
	});
});
