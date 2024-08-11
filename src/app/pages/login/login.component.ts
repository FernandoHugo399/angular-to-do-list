import { Component } from '@angular/core';
import { UserLoginDTO } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public isButtonDisabled = false;
  
  public user: UserLoginDTO = {
    email: '',
    password: ''
  };
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  public async login() {
    this.isButtonDisabled = true;

    try {
      if (!this.user.email || !this.user.password) {
        throw new Error("Preencha todos os campos")
      }

      await this.authService.login(this.user);

      this.router.navigate(['']);
    } catch (error: any) {
      if(error.code) {
        this.toastr.error(this.authService.getFirebaseError(error.code));
      } else {
        this.toastr.error(error.message)
      }
      
      this.user = {
        email: '',
        password: ''
      }

    } finally {
      this.isButtonDisabled = false;
    }
  }
}
