import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User, UserCollection } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<UserCollection>;
  
  constructor ( private auth: AngularFireAuth, private afs: AngularFirestore) {
      this.userCollection = this.afs.collection<UserCollection>('User');
  }

  public async login(user: User) {
    const request = await this.auth.signInWithEmailAndPassword(user.email, user.password);
    const uid = request.user?.uid;
    this.userCollection.doc(uid).get().subscribe();
  }

  public async register(user: User) {
      const request = await this.auth.createUserWithEmailAndPassword(user.email, user.password);
      const uid = request.user?.uid;
      this.userCollection.doc(uid).set({
        email: user.email
      });
  }

  public logout() {
    return this.auth.signOut();
  }

  public getAuth() {
    return this.auth;
  }
}
