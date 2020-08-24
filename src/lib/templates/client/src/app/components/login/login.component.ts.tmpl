import { Component } from '@angular/core';
import { AuthCredentials } from '../../models/auth-credentials.model';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  authCredentials: AuthCredentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
  }

  login() {
    const snackbarConfigSuccess: MatSnackBarConfig = {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-primary']
    };

    const snackbarConfigError: MatSnackBarConfig = {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-accent']
    };
    this.isLoading = true;
    this.authService.login(this.authCredentials)
      .subscribe(data => {
        this.isLoading = false;
        if (data instanceof HttpErrorResponse) {
          this.snackBar.open('Unauthorized', null, snackbarConfigError);
        } else {
          this.snackBar.open(`Welcome ${data.name}!`, null, snackbarConfigSuccess);
          const loader = document.getElementById('login-loader');
          loader.classList.add('login-animation');
          setTimeout(() => {
            this.router.navigate(['']);
          }, 500);
        }
      });
  }
}
