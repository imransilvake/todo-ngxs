// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// app
import { NgxsModule } from '@ngxs/store';
import { FormComponent } from './form.component';
import { TodoState } from 'src/app/store/states/todo.state';

describe('Form Component', () => {
    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                BrowserModule,
                FormsModule,
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
        form.todoForm.get('userId').setValue('');
        form.todoForm.get('title').setValue('');

        // expect
        expect(form.todoForm.valid).toBeFalsy();
    });

    it('should have form valid', () => {
        const fixture = TestBed.createComponent(FormComponent);
        const form = fixture.componentInstance;

        // set form values
        form.todoForm.get('id').setValue('1');
        form.todoForm.get('userId').setValue('212');
        form.todoForm.get('title').setValue('Hello World');

        // expect
        expect(form.todoForm.valid).toBeTruthy();
    });
});