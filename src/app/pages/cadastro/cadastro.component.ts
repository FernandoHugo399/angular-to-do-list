import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  public disabledButton = false;
  
  public user: UserDTO = {
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
    this.disabledButton = true;

    try {
      if(this.user.email == '' || 
         this.user.password == '' || 
         this.user.confirmPassword == '') {
        throw new Error('Preencha todos os campos!')
      }

      await this.authService.register(this.user);
      this.router.navigate([''])
      
    } catch (error: any) {
      this.toastr.error(error.message);
      
      this.user = {
        email: '',
        password: '',
        confirmPassword: ''
      }
    } finally {
      this.disabledButton = false;
    }
  }
}
