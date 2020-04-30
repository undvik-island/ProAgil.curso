import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(private authService: AuthService,
              public router: Router,
              public fb: FormBuilder,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.validation();
  }
// sempre que tiver duas validações, utilize [] como delimitador
  validation() {
    this.registerForm = this.fb.group({
      fullName : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      userName : ['', Validators.required],
      passwords: this.fb.group({
        password : ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword : ['', Validators.required]
      }, { validators : this.compararSenhas })
    });
  }

  compararSenhas(fb: FormGroup) {
    const confirmeSenhaCtrl = fb.get('confirmPassword');
    if (confirmeSenhaCtrl.errors == null || 'mismatch' in confirmeSenhaCtrl.errors) {
      if (fb.get('password').value !== confirmeSenhaCtrl.value) {
        confirmeSenhaCtrl.setErrors({ mismatch: true });
      } else {
        confirmeSenhaCtrl.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign(
        { password: this.registerForm.get('passwords.password').value },
        this.registerForm.value
      );
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          this.toastr.success('Cadastro Realizado!');
        }, error => {
          console.log(error);
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Cadastro Duplicado.');
                break;
              default:
                this.toastr.error(`Erro no cadastro! CODE: ${element.code}`);
                break;
            }
          });
        }
      );
    }
  }

}
