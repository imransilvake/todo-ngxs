// angular
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// app
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
    imports: [
        ReactiveFormsModule
    ],
    declarations: [
        ListComponent,
        FormComponent
    ],
    exports: [
        ListComponent,
        FormComponent
    ]
})

export class TodoModule {
}
