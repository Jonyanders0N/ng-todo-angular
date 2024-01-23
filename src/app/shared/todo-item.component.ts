import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "../core/todo.model";

@Component({
    standalone: true,
    selector: 'todo-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="todo-item">
            {{ todo.title }}
            <span (click)="onDelete.next()" class="material-symbols-outlined " delete-icon> delete </span>
        </div>
    `
})

export default class TodoItemComponent {

    @Input({required: true}) todo!: Todo;
    @Output() onDelete = new EventEmitter<void>();
    
}