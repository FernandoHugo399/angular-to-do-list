import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task } from "../../models/Task";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tasks: Task[] = [];

  constructor(private authService: AuthService, private taskService: TaskService) {}

  public async ngOnInit(): Promise<void> {
    await this.loadTasks();
  }

  private async loadTasks() {
    this.tasks = await this.taskService.getTasks();
  }

  public async addTask() {
    const text = window.prompt('Digite a tarefa:');

    if (!(text && text.trim() !== '')) return;

    await this.taskService.addTask(<string>text);
    await this.loadTasks();
  }

  public async changeStatusTaskToDone(taskId: string) {
    await this.taskService.changeStatusTaskToDone(taskId);
    await this.loadTasks();
  }

  public async updateTask(taskId: string, currentText: string) {
    const text = window.prompt('Atualizar tarefa:', currentText);

    if (!(text && text.trim() !== '')) return;
    await this.taskService.updateTask(taskId, { text: text });
    await this.loadTasks();
  }

  public async deleteTask(taskId: string) {
    if (!confirm('Tem certeza que deseja apagar a tarefa?')) return;

    await this.taskService.deleteTask(taskId);
    await this.loadTasks();
  }

  public async logout() {
    await this.authService.logout();
  }
}
