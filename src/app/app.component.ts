import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from './services/todo/todo.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title(title: any) {
    throw new Error('Method not implemented.');
  }

  hasTodo$?: Observable<boolean>;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.fetchFormLocalStorage();
    this.hasTodo$ = this.todoService.length$.pipe(map(length => length > 0));
  }
}
