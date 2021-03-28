import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YComponent } from './y.component';
import { YDetailComponent } from './y-detail/y-detail.component';
import { GenericResolverService } from '../../services/generic-resolver.service';
import { CRUDAction } from '../../models/crud-action.model';
const routes: Routes = [
    {
      path: '',
      component: YComponent
    },
    {
      path: 'create',
      component: YDetailComponent
    },
    {
      path: 'edit/:id',
      component: YDetailComponent,
      resolve: {y: GenericResolverService},
      data: {resolverData: {endpoint: 'ys'}, action: CRUDAction.UPDATE}
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class YRoutingModule {
}
