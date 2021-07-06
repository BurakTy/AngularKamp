import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createloginForm();
  }

  createloginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.value) {
      let user = Object.assign({}, this.loginForm.value);
      this.authService.login(user).subscribe(
        (res) => {
          this.toastrService.info(res.message);
          localStorage.setItem('token', res.data.token);
        },
        (err) => {
         
          if(err.status==0){
            this.toastrService.info("İnternet Erişim Hatası");
          }else{
            this.toastrService.info(err.error);
          }
        }
      );
    }
  }
}
