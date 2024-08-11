import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserRegisterDTO } from '../../models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  public isButtonDisabled = false;
  
  public user: UserRegisterDTO = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) { }
  
  public async register() {
    this.isButtonDisabled = true;

    try {
      if(this.user.email == '' || 
         this.user.password == '' || 
         this.user.confirmPassword == '') {
        throw new Error('Preencha todos os campos!')
      }

      if (this.user.password !== this.user.confirmPassword) {
        throw new Error("As senhas não correspondem!");
      }

      await this.authService.register(this.user);
      this.router.navigate([''])
      
    } catch (error: any) {
      if(error.code) {
        this.toastr.error(this.authService.getFirebaseError(error.code));
      } else {
        this.toastr.error(error.message)
      }
      
      this.user = {
        email: '',
        password: '',
        confirmPassword: ''
      }

    } finally {
      this.isButtonDisabled = false;
    }
  }
}
