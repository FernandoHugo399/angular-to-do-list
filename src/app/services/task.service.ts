import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Task, TaskCollection } from '../models/Task';
import { AuthService } from './auth.service';
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskCollection: AngularFirestoreCollection<TaskCollection>;

  constructor (
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.taskCollection = this.firestore.collection<TaskCollection>('Task');
  }

  public async getTasks(): Promise<Task[]> {
    const tasks: Task[] = [];

    let uid;
    const auth = await firstValueFrom(this.authService.getAuth().user);
    uid = auth!.uid;

    const response = await this.taskCollection.ref
      .orderBy("created_at", "desc")
      .where("id_user", "==", uid)
      .where("done", "==", false)
      .get();

    response.docs.map((e)=> {
      const data = e.data();
      tasks.push({
        id_task: e.id,
        text: data.text,
        done: data.done,
        created_at: data.created_at
      })
    })

    return tasks;
  }

  public async addTask(text: string) {
    let task: TaskCollection = {
      text: text,
      done: false,
      created_at: new Date(),
      id_user: ''
    }

    const response = await firstValueFrom(this.authService.getAuth().user);
    task.id_user = response!.uid;

    await this.taskCollection.add(task);
  }

  public async changeStatusTaskToDone(taskId: string) {
    await this.updateTask(taskId, {done: true})
  }

  public async updateTask(taskId: string, updatedData: Partial<TaskCollection>) {
    let uid;
    const auth = await firstValueFrom(this.authService.getAuth().user);
    uid = auth!.uid;

    updatedData.id_user = uid;
    await this.taskCollection.doc(taskId).update(updatedData);
  }

  public async deleteTask(taskId: string) {
    await this.taskCollection.doc(taskId).delete();
  }
}
