import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUser } from '../../models/auth-user.model';
import { Router, Routes } from '@angular/router';
import { ResponsiveLayoutService } from '../../services/responsive-layout.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  isSmall$: Observable<boolean> = this.layout.isSmall();
  currentUser: Observable<AuthUser>;
  routerLinks: Routes;
  darkTheme: boolean;

  constructor(private layout: ResponsiveLayoutService, private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private router: Router) {
    const childrenRoutes = this.router.config.filter(route => route.path === '');
    if (childrenRoutes.length > 0) {
      this.routerLinks = childrenRoutes[0].children;
    }
    this.currentUser = this.authService.currentUser;
    this.initTheme();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  initTheme(): void {
    const theme = JSON.parse(localStorage.getItem(`DarkTheme`));
    if (theme) {
      this.selectedThemeChanged(true);
    } else {
      this.selectedThemeChanged(false);
    }
  }

  setTheme(isDarkTheme: boolean): void {
    const bodyEl = document.getElementById('body');
    if (isDarkTheme) {
      bodyEl.classList.add('dark-theme');
    } else {
      bodyEl.classList.remove('dark-theme');
    }
  }

  selectedThemeChanged(event): void {
    this.darkTheme = event as boolean;
    localStorage.setItem(`DarkTheme`, JSON.stringify(event));
    this.setTheme(this.darkTheme);
  }

}
