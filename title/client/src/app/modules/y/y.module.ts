import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { YComponent } from './y.component';
import { YDetailComponent } from './y-detail/y-detail.component';
import { YRoutingModule } from './y-routing.module';

@NgModule({
    declarations: [YComponent, YDetailComponent],
    imports: [
      SharedModule,
      YRoutingModule
    ]})
export class YModule {
}
