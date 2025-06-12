import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {LoginService} from "@/layouts/login/login.service";
import {AccountService} from "@/core/auth/account.service";
import {User} from "firebase/auth";


@Injectable({ providedIn: 'root' })
export class AuthService {
    public user?: User | null = null;

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  loginWithEmail(email: string, password: string): void {
    const credentials = {
      username: email,
      password,
      rememberMe: true,
    };

    this.loginService.login(credentials).subscribe({
      next: () => {
        this.accountService.identity(true).subscribe(() => {
          this.router.navigate(['/']);
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastr.error('Incorrect username or password');
        } else {
          this.toastr.error('Login failed. Please try again later.');
        }
      },
    });
  }

/*  logout(): void {
    this.loginService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }*/

  async registerWithEmail(email: string, password: string) {
    this.toastr.info('Registration should be handled via the backend or a registration component.');
    // Or navigate to the JHipster registration page
    this.router.navigate(['/register']);
  }

  async signInByGoogle() {
    this.toastr.info('Google sign-in is not implemented. Consider adding OAuth2 support.');
  }

  async getProfile() {
    this.accountService.identity().subscribe(account => {
      if (!account) {
        console.log('No account found');
        //this.logout();
      }
    });
  }

  logout() {

  }
}
