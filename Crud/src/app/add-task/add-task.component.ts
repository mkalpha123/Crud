import { Component } from '@angular/core';
import { Task, TaskServiceService } from '../task-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule,
    FormsModule,HomeComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  task: Task = {
    title: '',
    description: '',
    editMode: false
  };

  constructor(private taskService: TaskServiceService) { }

  ngOnInit(): void {
  }

  addTask() {
    if (this.task.title.trim() !== '' && this.task.description.trim() !== '') {
      this.taskService.addTask(this.task);
      this.task = { title: '', description: '',editMode:false }; // Reset the task object after adding
    }
  }
}
