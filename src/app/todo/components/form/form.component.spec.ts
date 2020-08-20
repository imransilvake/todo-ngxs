// angular
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// app
import { NgxsModule } from '@ngxs/store';
import { TodoState } from 'src/app/todo/store/states/todo.state';
import { FormComponent } from './form.component';

describe('Form Component', () => {
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

    it('should have form invalid', () => {
        const fixture = TestBed.createComponent(FormComponent);
        const form = fixture.componentInstance;

        // set form values
        form.todoForm.get('id').setValue('');
        form.todoForm.get('title').setValue('');

        // expect
        expect(form.todoForm.valid).toBeFalsy();
    });

    it('should have form valid', () => {
        const fixture = TestBed.createComponent(FormComponent);
        const form = fixture.componentInstance;

        // set form values
        form.todoForm.get('id').setValue('1');
        form.todoForm.get('title').setValue('Hello World');

        // expect
        expect(form.todoForm.valid).toBeTruthy();
    });
});