import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task } from "../../models/Task";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tasks: Task[] = [];

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private loadingService: LoadingService
  ) {}

  public async ngOnInit(): Promise<void> {
    await this.loadTasks();
  }

  private async loadTasks() {
    this.loadingService.show();

    this.tasks = await this.taskService.getTasks();

    this.loadingService.hide();
  }

  public async addTask() {
    this.loadingService.show();

    const text = window.prompt('Digite a tarefa:');

    if (!(text && text.trim() !== '')) return;

    await this.taskService.addTask(<string>text);
    await this.loadTasks();

    this.loadingService.hide();
  }

  public async changeStatusTaskToDone(taskId: string) {
    this.loadingService.show();

    await this.taskService.changeStatusTaskToDone(taskId);
    await this.loadTasks();

    this.loadingService.hide();
  }

  public async updateTask(taskId: string, currentText: string) {
    this.loadingService.show();

    const text = window.prompt('Atualizar tarefa:', currentText);

    if (!(text && text.trim() !== '')) return;
    await this.taskService.updateTask(taskId, { text: text });
    await this.loadTasks();

    this.loadingService.hide();
  }

  public async deleteTask(taskId: string) {
    this.loadingService.show();

    if (!confirm('Tem certeza que deseja apagar a tarefa?')) return;

    await this.taskService.deleteTask(taskId);
    await this.loadTasks();

    this.loadingService.hide();
  }

  public async logout() {
    await this.authService.logout();
  }
}
