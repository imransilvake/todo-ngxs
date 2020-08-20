// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// app
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoState } from './todo/store/states/todo.state';
import { TodoModule } from './todo/todo.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        // core
		BrowserModule,
		HttpClientModule,
        NgxsModule.forRoot([
            TodoState
        ]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        AppRoutingModule,

        // app
        TodoModule
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
