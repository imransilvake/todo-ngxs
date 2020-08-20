// angular
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// app
import { NgxsModule } from '@ngxs/store';
import { TodoState } from './todo/store/states/todo.state';
import { AppComponent } from './app.component';
import { FormComponent } from './todo/components/form/form.component';
import { ListComponent } from './todo/components/list/list.component';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let elements: HTMLElement;

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

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		elements = fixture.nativeElement;

		fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(component).toBeDefined();
	});

	it(`should have as title 'Todo App using NGXS'`, () => {
		expect(component.title).toEqual('Todo App using NGXS');
	});

	it('should contain a text: NGXS', () => {
		expect(elements.querySelector('.container h1').textContent).toContain('NGXS');
	});
});
