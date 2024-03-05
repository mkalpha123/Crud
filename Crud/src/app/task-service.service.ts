import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

export interface Task {
  editMode: boolean;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);


  constructor() { }
  getTasks() {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks); // Emit the updated list of tasks
  }

  editTask(index: number, updatedTask: Task) {
    this.tasks[index] = updatedTask;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  getOriginalTask(index: number): Task {
    return { ...this.tasks[index] };
  }
}
