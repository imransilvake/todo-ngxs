import { Todo } from "../models/todo.model";

// add a todo
export class AddTodo {
	static readonly type = '[Todo] Add';
	constructor(public payload: Todo) { }
}

// get todos list
export class GetTodos {
	static readonly type = '[Todo] Get';
}

// update a todo
export class UpdateTodo {
	static readonly type = '[Todo] Update';
	constructor(public payload: Todo, public id: number) { }
}

// delete a todo
export class DeleteTodo {
	static readonly type = '[Todo] Delete';
	constructor(public id: number) { }
}

// set selected todo
export class SetSelectedTodo {
	static readonly type = '[Todo] Set';
	constructor(public payload: Todo) { }
}
