import { Component, OnInit } from '@angular/core';
import { Task, TaskServiceService } from '../task-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskServiceService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      console.log(tasks,"tasks")
      this.tasks = tasks.map(task => ({ ...task, editMode: false }));
    });
  }


  deleteTask(index: number) {
    this.taskService.deleteTask(index);
  }

  saveTask(index: number) {
    this.taskService.editTask(index, this.tasks[index]);
    this.tasks[index].editMode = false;
  }

  cancelEdit(index: number) {
    // Reset task to original values
    const originalTask = this.taskService.getOriginalTask(index);
    this.tasks[index] = { ...originalTask, editMode: false };
  }
}
