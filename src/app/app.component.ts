// angular
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: [
		`h3 { margin-top: 25px; }`
	]
})

export class AppComponent {
	public title = 'Todo App using NGXS';
}
