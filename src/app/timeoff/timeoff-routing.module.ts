import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TimeOffComponent} from './timeoff.component';
import { LayoutComponent} from '../users/layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: TimeOffComponent },
            { path: 'time-off', component: TimeOffComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimeOffRoutingModule { }