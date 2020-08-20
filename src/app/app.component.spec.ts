// angular
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// app
import { NgxsModule } from '@ngxs/store';
import { TodoState } from './todo/store/states/todo.state';
import { AppComponent } from './app.component';
import { FormComponent } from './todo/components/form/form.component';
import { ListComponent } from './todo/components/list/list.component';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let nativeElement: HTMLElement;
	let debugElement: DebugElement;

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
		nativeElement = fixture.nativeElement;
		debugElement = fixture.debugElement;

		fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(component).toBeDefined();
	});

	it(`should have as title 'Todo App using NGXS'`, () => {
		expect(component.title).toEqual('Todo App using NGXS');
	});

	it('should contain a text: "NGXS" using querySelector', () => {
		const titleText = nativeElement.querySelector('.container h1').textContent;
		expect(titleText).toContain('NGXS');
	});

	it('should contain a text: "NGXS" using By.css', () => {
		const titleText = debugElement.query(By.css('.container h1')).nativeElement.textContent;
		expect(titleText).toContain('NGXS');
	});
});
