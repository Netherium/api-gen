import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShellComponent } from './components/shell/shell.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

const childrenRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      state: 'users',
      slug: 'Users',
      icon: 'person',
      type: 'base'
    }
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    data: {
      state: 'users',
      slug: 'Users',
      icon: 'person',
      type: 'base'
    }
  },
  {
    path: 'roles',
    loadChildren: () => import('./modules/role/role.module').then(m => m.RoleModule),
    data: {
      state: 'roles',
      slug: 'Roles',
      icon: 'group',
      type: 'base'
    }
  },
  {
    path: 'resource-permissions',
    loadChildren: () => import('./modules/resource-permission/resource-permission.module').then(m => m.ResourcePermissionModule),
    data: {
      state: 'resourcePermissions',
      slug: 'Resource Permissions',
      icon: 'admin_panel_settings',
      type: 'base'
    }
  },
  {
    path: 'media-objects',
    loadChildren: () => import('./modules/media-object/media-object.module').then(m => m.MediaObjectModule),
    data: {
      state: 'mediaObjects',
      slug: 'Media Objects',
      icon: 'perm_media',
      type: 'base'
    }
  },
  {
    path: 'books',
    loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule),
    data: {
      state: 'books',
      slug: 'Books',
      icon: 'tag',
      type: 'resource'
    }
  }
];

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuardService],
    children: childrenRoutes
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
