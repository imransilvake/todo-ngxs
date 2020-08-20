// angular
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// app
import { NgxsModule } from '@ngxs/store';
import { TodoState } from 'src/app/todo/store/states/todo.state';
import { FormComponent } from './form.component';

describe('Form Component', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    
    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                HttpClientTestingModule,
                NgxsModule.forRoot([
					TodoState
				])
            ],
            declarations: [
                FormComponent
            ]
        }).compileComponents();
    });

    beforeEach(() => {
		fixture = TestBed.createComponent(FormComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should have Form Component', () => {
		expect(component).toBeDefined();
	});

    it('should have form invalid', () => {
        // set form values
        component.todoForm.get('id').setValue(null);
        component.todoForm.get('title').setValue(null);

        // expect
        expect(component.todoForm.valid).toBeFalsy();
    });

    it('should have form valid', () => {
        // set form values
        component.todoForm.get('id').setValue(1);
        component.todoForm.get('title').setValue('Hello World');

        // expect
        expect(component.todoForm.valid).toBeTruthy();
    });
});
