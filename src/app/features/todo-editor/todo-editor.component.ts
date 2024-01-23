import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, signal, Signal, ViewChild } from "@angular/core";
import { TodosService } from "../../core/todos.service";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop"
import { Todo } from "../../core/todo.model";
import TodoItemComponent from "../../shared/todo-item.component";
import {FormsModule} from "@angular/forms";

@Component({
    standalone: true,
    selector: 'todo-editor',
    imports: [TodoItemComponent, FormsModule],
    template: `

    <div class="todo-editor">
        <input 
                type="text" 
                (keydown.enter)="addTodo()" 
                placeholder="Whats need to be done?" 
                [(ngModel)]="inputValue"
        /> 
        @for (todo of todos(); track $index){
            <todo-item [todo]="todo" (onDelete)="deleteTodo(todo.id)"></todo-item>
        }
    </div>

        `,

    changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class TodoEditorComponent {

    inputValue = '';
    private todosService: TodosService = inject(TodosService);

    todos = this.todosService.todos;

    ngOninit() {
        this.todosService.getTodos()
    }

    addTodo():void {
        this.todosService.addTodo(this.inputValue);
        this.inputValue = '';
    }

    deleteTodo(id: string) {
        this.todosService.deleteTodo(id)
    }
     
}