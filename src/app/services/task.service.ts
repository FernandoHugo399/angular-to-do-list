import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { TaskCollection } from '../models/Task';
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
}
