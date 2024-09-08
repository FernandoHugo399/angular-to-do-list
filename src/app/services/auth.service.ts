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
    await this.userCollection.doc(uid).set({
      email: user.email
    });
  }

  public logout() {
    return this.auth.signOut();
  }

  public getAuth() {
    return this.auth;
  }

  public getFirebaseError(code: string): string {
    switch (code) {
      case 'auth/app-deleted':
        return 'Ocorreu um erro na aplicação!';
      case 'auth/app-not-authorized':
        return 'Aplicação não autorizada para autenticação!';
      case 'auth/argument-error':
        return 'Erro nos argumentos fornecidos!';
      case 'auth/invalid-api-key':
        return 'Chave de API inválida!';
      case 'auth/invalid-user-token':
        return 'Token de usuário inválido!';
      case 'auth/network-request-failed':
        return 'Falha na conexão de rede!';
      case 'auth/operation-not-allowed':
        return 'Operação não permitida!';
      case 'auth/requires-recent-login':
        return 'Ação sensível à segurança!';
      case 'auth/too-many-requests':
        return 'Muitas tentativas!';
      case 'auth/unauthorized-domain':
        return 'O domínio da aplicação não está autorizado para realizar operações de autenticação!';
      case 'auth/user-disabled':
        return 'Esta conta foi desativada!';
      case 'auth/user-token-expired':
        return 'Sua sessão expirou!';
      case 'auth/web-storage-unsupported':
        return 'Este navegador não suporta armazenamento web necessário para autenticação!';
      case 'auth/account-exists-with-different-credential':
        return 'Uma conta com o mesmo email já existe com credenciais diferentes!';
      case 'auth/credential-already-in-use':
        return 'O email já está em uso!';
      case 'auth/invalid-email':
        return 'O email fornecido é inválido!';
      case 'auth/invalid-password':
        return 'A senha fornecida é inválida!';
      case 'auth/weak-password':
        return 'A senha é muito fraca!';
      case 'auth/email-already-in-use':
        return 'O email fornecido já está em uso!';
      case 'auth/user-not-found':
        return 'Usuário não encontrado!';
      case 'auth/wrong-password':
        return 'Senha incorreta!".';
      case 'auth/invalid-verification-code':
        return 'O código de verificação é inválido!';
      case 'auth/invalid-verification-id':
        return 'O ID de verificação é inválido!';
      case 'auth/invalid-credential':
        return 'As credenciais fornecidas são inválidas!';
      case 'auth/missing-verification-code':
        return 'O código de verificação está ausente!';
      case 'auth/missing-verification-id':
        return 'O ID de verificação está ausente!';
      case 'auth/missing-credential':
        return 'As credenciais estão ausentes!';
      case 'auth/provider-already-linked':
        return 'Esta conta já está associada a um provedor diferente!';
      case 'auth/no-such-provider':
        return 'Este provedor não está associado a esta conta!';
      case 'auth/timeout':
        return 'A operação excedeu o tempo limite!';
      case 'auth/quota-exceeded':
        return 'A cota do Firebase foi excedida!';
      case 'auth/operation-not-supported-in-this-environment':
        return 'Esta operação não é suportada no ambiente atual!.';
      case 'auth/popup-blocked':
        return 'O popup foi bloqueado pelo navegador!';
      case 'auth/popup-closed-by-user':
        return 'O popup foi fechado antes da conclusão da operação!';
      case 'auth/unauthorized-continue-uri':
        return 'O URI de continuação não está autorizado!';
      case 'auth/invalid-continue-uri':
        return 'O URI de continuação é inválido!';
      case 'auth/captcha-check-failed':
        return 'A verificação do reCAPTCHA falhou!';
      case 'auth/invalid-custom-token':
        return 'O token personalizado é inválido!';
      case 'auth/custom-token-mismatch':
        return 'O token personalizado não corresponde ao solicitado!';
      default:
        return 'Erro desconhecido. Por favor, tente novamente ou entre em contato com o suporte!';
    }
  }
}
