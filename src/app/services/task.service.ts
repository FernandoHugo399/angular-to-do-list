import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Task, TaskCollection } from '../models/Task';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskCollection: AngularFirestoreCollection<TaskCollection>;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
    ) {
      this.taskCollection = this.firestore.collection<TaskCollection>('Task');
    }

    public async getTaks(): Promise<Task[]> {
      const tasks: Task[] = [];

      let uid = '';
      this.authService.getAuth().user.subscribe(res => uid = res!.uid);

      const response = await this.taskCollection.ref.where("id_user", "==", uid).get();
      response.docs.map((e)=> {
        const data = e.data();
        tasks.push({
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

      this.authService.getAuth().user.subscribe( res => task.id_user = res!.uid);

      await this.taskCollection.add(task);
    }

  public async updateTask(taskId: string, updatedData: Partial<TaskCollection>) {
    let uid = '';
    this.authService.getAuth().user.subscribe(res => uid = res!.uid);

    updatedData.id_user = uid;

    await this.taskCollection.doc(taskId).update(updatedData);
  }

  public async deleteTask(taskId: string) {
    await this.taskCollection.doc(taskId).delete();
  }
}
