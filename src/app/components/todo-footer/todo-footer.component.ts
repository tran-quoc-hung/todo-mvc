import { Component, OnDestroy, OnInit } from '@angular/core';

import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Filter, FilterButton } from 'src/app/models/filtering.model';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
})
export class TodoFooterComponent implements OnInit, OnDestroy {
  filterButtons: FilterButton[] = [
    { type: Filter.All, label: 'all', isActive: true },
    { type: Filter.Active, label: 'Active', isActive: false },
    { type: Filter.Completed, label: 'Completed', isActive: false },
  ];

  length = 0;

  hasCompleted$: Observable<boolean> = new Observable<boolean>();
  destroy$: Subject<null> = new Subject<null>();
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.hasCompleted$ = this.todoService.todos$.pipe(
      map(todos => todos.some(t =>  t.isCompleted)),
      takeUntil(this.destroy$)
    );
    this.todoService.length$.pipe(takeUntil(this.destroy$)).subscribe(length => {
      this.length = length;
    });
  }

  filter(type: Filter) {
    this.setActiveFitlerBtn(type);
    this.todoService.filterTodos(type);
  }

  private setActiveFitlerBtn(type: Filter) {
    this.filterButtons.forEach(btn => {
      btn.isActive = btn.type === type;
    });
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  ngOnDestroy() {
    // this.destroy$.next();
    this.destroy$.complete();
  }

}
